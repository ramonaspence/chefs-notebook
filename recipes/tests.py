from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.urls import reverse
from accounts.models import User



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
        # reverse() uses namespaces to retrieve an url. here the colon connects namespaces linked by include()
        # here api_v1 `includes` recipes urls and recipes `includes` list_recipe
        url = reverse('api_v1:recipes:list_recipe')
        recipe = {'title': 'title', 'description': 'description',
            'instructions': ['instructions'], 'ingredients': ['ingredients'],
            'tags': []}
        response = self.client.post(url, recipe)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
