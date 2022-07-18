from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.urls import reverse

from accounts.models import User


class AccountViewsTestCase(APITestCase):

    def authenticate(self):
        self.client.post('/dj-rest-auth/registration/', {'username': "user1",
                         'password1': "pas$w0rd", 'password2': "pas$w0rd"})
        # user = User.objects.create(username="user1")
        token = Token.objects.get(user__username="user1")
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")
        
        
class TestUserListView(AccountViewsTestCase):
    
    def test_lists_all_users(self):
        self.authenticate()
        response = self.client.get(reverse('api_v1:accounts:users'))
        self.assertIsInstance(response.data, list)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['username'], "user1")        