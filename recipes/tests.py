from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.urls import reverse
from accounts.models import User
from recipes.models import Recipe, Tag, Comment


class RecipesAPITestCase(APITestCase):
    
    def setup(self):
        # this will be run for each test that inherits from BaseAPITestCase
        pass
            
    def create_recipe(self):
        # reverse() uses namespaces to retrieve an url. here the colon 
        # connects namespaces linked by include() here api_v1 `includes`
        # recipes urls and recipes `includes` list_recipe
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': 'title', 'description': 'description',
                'instructions': ['instructions'], 'ingredients': ['ingredients'], 'tags': []}
        response = self.client.post(url, recipe)
        return response
    
    def authenticate(self):
        """authenticate a user using Token and .credentials
        https://www.django-rest-framework.org/api-guide/testing/#credentialskwargs
        """
        res = self.client.post('/dj-rest-auth/registration/', {
            'username': "username", 'email': "username@example.com",
            'password1': "pas$w0rd", 'password2': "pas$w0rd"})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        token = Token.objects.get(user__username="username")
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")


class TestRecipeListCreate(RecipesAPITestCase):
    
    def test_should_not_create_recipe_without_auth(self):
        # retrieve url
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': 'title', 'description': 'description',
            'instructions': ['instructions'], 'ingredients': ['ingredients'],
            'tags': []}
        # make a post request using APIClient
        response = self.client.post(url, recipe)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
          
    def test_creates_recipe_with_auth(self):
        self.authenticate()
        previous_recipe_count = Recipe.objects.all().count()
        response = self.create_recipe()
        self.assertEqual(Recipe.objects.all().count(), previous_recipe_count
                         + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'title')
        self.assertEqual(response.data['description'], 'description')
        self.assertEqual(response.data['instructions'], 'instructions')
        self.assertEqual(response.data['ingredients'], 'ingredients')
        
        
    def test_retrieves_all_recipes(self):
        self.authenticate()
        url = reverse('api_v1:recipes:list_recipe')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        
        self.create_recipe()
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)
        
class TestRecipeProfileListView(RecipesAPITestCase):
    
    def test_should_not_retrieve_without_auth(self):
        url = reverse('api_v1:recipes:profile_recipes', args=[1])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_should_retrieve_one_users_recipes(self):
        self.authenticate()
        # create recipe to test
        response = self.create_recipe()
        # ensure recipe was created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        url = reverse('api_v1:recipes:profile_recipes', args=[1])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # test userid in recipe is authenticated user's id
        self.assertEqual(dict(response.data[0])['owner']['id'], 1)
        
class TestRecipeByFollowersList(RecipesAPITestCase):
    
    def test_should_not_retrieve_without_auth(self):
        url = reverse('api_v1:recipes:dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_should_retrieve_recipes_by_followed_users(self):
        # authenticate as `username`
        self.authenticate()
        # create recipe as `username`
        response = self.create_recipe()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # create user that will follow `username`
        response = self.client.post(
            '/dj-rest-auth/registration/', {'username': "follower",
                                            'email': "follower@example.com",
                                            'password1': "pas$w0rd", 
                                            'password2': "pas$w0rd"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        token = Token.objects.get(user__username="follower")
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")
        # create connection between `username` and `follower`
        followed_user_id = 1
        response = self.client.post(reverse('api_v1:profiles:connections'),
                                            {'following': followed_user_id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
        # test retreives 
        url = reverse('api_v1:recipes:dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(dict(response.data[0])['owner']['id'], followed_user_id)  
        
class TestRecipeDetailView(RecipesAPITestCase):
    
        def test_retrieves_one_recipe(self):
            self.authenticate()
            response = self.create_recipe()
            res = self.client.get(
                reverse('api_v1:recipes:detail_recipe', 
                        kwargs={'pk': response.data['id']}))
            self.assertEqual(res.status_code, status.HTTP_200_OK)
            recipe = Recipe.objects.get(id = response.data['id'])
            self.assertEqual(recipe.title, res.data['title'])
            
        def test_updates_one_recipe(self):
            self.authenticate()
            response = self.create_recipe()
            res = self.client.patch(
                reverse('api_v1:recipes:detail_recipe', 
                        kwargs={'pk': response.data['id']}), {
                        'title': "new_title", 'description': "new_desc", 
                        'instructions': ["instructions"], 
                        'ingredients': ["ingredients"]
                })
            self.assertEqual(res.status_code, status.HTTP_200_OK)
            self.assertEqual(
                Recipe.objects.get(id = response.data['id']).title, "new_title")
            
            
        def test_destroys_one_recipe(self):
            self.authenticate()
            response = self.create_recipe()
            
            previous_recipe_count = Recipe.objects.all().count()
            self.assertGreater(previous_recipe_count, 0)
            self.assertEqual(previous_recipe_count, 1)
            
            res = self.client.delete(
                reverse('api_v1:recipes:detail_recipe', 
                        kwargs={'pk': response.data['id']}))
            self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
            self.assertEqual(Recipe.objects.all().count(), previous_recipe_count - 1)
            
            res = self.client.get(
                reverse('api_v1:recipes:detail_recipe', 
                        kwargs={'pk': response.data['id']}))
        
class TestTagListCreate(RecipesAPITestCase):
    
    def test_creates_tags(self):
        self.authenticate()
        response = self.create_recipe()
        
        res = self.client.post(
            reverse('api_v1:recipes:tag_create'), {'name': "pizza"})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tag.objects.get(id = response.data['id']).name, "pizza")
    
    def test_lists_all_tags(self):
        self.authenticate()
        self.create_recipe()
        self.client.post(
            reverse('api_v1:recipes:tag_create'), {'name': "pizza"})
        response = self.client.get(reverse('api_v1:recipes:tag_create'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        self.assertEqual(len(response.data), 1)

        
class TestCommentListCreate(RecipesAPITestCase):
    
    def test_creates_comment(self):
        self.authenticate()
        response = self.create_recipe()
        
        res = self.client.post(
            reverse('api_v1:recipes:create_comment', 
                    kwargs={'pk': response.data['id']}), {
                'recipe': Recipe.objects.get(id=response.data['id']), 
                'body': "comment"})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        
    def test_lists_all_comments(self):
        self.authenticate()
        response = self.create_recipe()
        # creation of a comment takes the id of the recipe being commented on
        self.client.post(
            reverse('api_v1:recipes:create_comment', 
                    kwargs={'pk': response.data['id']}), {
                    'recipe': Recipe.objects.get(id=response.data['id']), 
                    'body': "comment"})
        res = self.client.get(
            reverse('api_v1:recipes:create_comment', 
                    kwargs={'pk': response.data['id']}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsInstance(res.data, list)
        
class TestCommentDeleteView(RecipesAPITestCase):
    
    def test_destroys_one_comment(self):
        self.authenticate()
        response = self.create_recipe()
        # create comment
        self.client.post(
            reverse('api_v1:recipes:create_comment', 
                    kwargs={'pk': response.data['id']}), {
                    'recipe': Recipe.objects.get(id=response.data['id']), 
                    'body': "comment"})
        previous_comment_count = Comment.objects.all().count()
        self.assertGreater(previous_comment_count, 0)
        self.assertEqual(previous_comment_count, 1)
        
        res = self.client.delete(
            reverse('api_v1:recipes:delete_comment', 
                    kwargs={'pk': response.data['id']}))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Comment.objects.all().count(), previous_comment_count
                         - 1)
        self.assertEqual(Comment.objects.all().count(), 0)
        res = self.client.get(
            reverse('api_v1:recipes:create_comment', 
                    kwargs={'pk': response.data['id']}))
        self.assertEqual(len(res.data), 0)
        
        
