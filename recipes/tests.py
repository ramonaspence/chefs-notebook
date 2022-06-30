from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from django.urls import reverse

class TestRecipeListCreate(APITestCase):

    def test_should_not_create_recipe_without_auth(self):
        # retrieve url
        url = reverse('api_v1:recipes:list_recipe')
        # recipe object
        recipe = {'title': '', 'description': '',
            'instructions': [], 'ingredients': [],
            'tags': []}
        # make a post request
        response = self.client.post(url, recipe)
        # test status code is 403
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)