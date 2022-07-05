from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.urls import reverse
from accounts.models import User
from recipes.models import Recipe



class TestRecipeListCreate(APITestCase):
    def authenticate(self):
        """authenticate a user using Token and .credentials
        https://www.django-rest-framework.org/api-guide/testing/#credentialskwargs
        """
        res = self.client.post('/dj-rest-auth/registration/', {'username': "username", 'email': "username@example.com",
                                                        'password1': "pas$w0rd", 'password2': "pas$w0rd"})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        token = Token.objects.get(user__username="username")
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")

    def test_should_not_create_recipe_without_auth(self):
        # retrieve url
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': '', 'description': '',
            'instructions': [], 'ingredients': [],
            'tags': []}
        # make a post request using APIClient
        response = self.client.post(url, recipe)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
          
    def test_creates_recipe_with_auth(self):
        self.authenticate()
        previous_recipe_count = Recipe.objects.all().count()
        # reverse() uses namespaces to retrieve an url. here the colon connects namespaces linked by include()
        # here api_v1 `includes` recipes urls and recipes `includes` list_recipe
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': 'title', 'description': 'description',
            'instructions': ['instructions'], 'ingredients': ['ingredients'],
            'tags': []}
        response = self.client.post(url, recipe)
        self.assertEqual(Recipe.objects.all().count(), previous_recipe_count + 1)
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
        
        recipe = {'title': 'title', 'description': 'description',
            'instructions': ['instructions'], 'ingredients': ['ingredients'],
            'tags': []}
        self.client.post(url, recipe)
        response = self.client.get(url)
        self.assertEqual(len(response.data), 1)
        
