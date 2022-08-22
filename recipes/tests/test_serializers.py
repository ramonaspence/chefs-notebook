from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.core.files import File
from django.urls import reverse
from accounts.models import User
from recipes.models import Recipe, Tag


class RecipeSerializerTestCase(APITestCase):
    def setup(self):
        self.authenticate()
        self.create_recipe()
    
    def create_recipe(self):
        # reverse() uses namespaces to retrieve an url. here the colon 
        # connects namespaces linked by include() here api_v1 `includes`
        # recipes urls and recipes `includes` list_recipe
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': 'title', 'description': 'description',
                'instructions': ['instructions'], 'ingredients': ['ingredients'], 'image': File(open('recipes/tmp/pizza.jpeg', 'rb')),
                'tags': []}
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
        
    def test_recipe_with_image_saves_with_tags(self):
        self.authenticate()
        response = self.create_recipe()
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertGreater(len(response.data['tags']), 0)
    
    def test_recipe_without_image_saves_without_tags(self):
        self.authenticate()
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': 'title', 'description': 'description',
                'instructions': ['instructions'], 'ingredients': ['ingredients'], 'tags': []}
        response = self.client.post(url, recipe)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data['tags']), 0)
    
    def test_recipe_saves_with_six_tags(self):
        self.authenticate()
        response = self.create_recipe()
        
        self.assertEqual(len(response.data['tags']), 6)