from django.urls import reverse
from django.core.files import File
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from profiles.models import Profile

class ProfilesAPITestCase(APITestCase):
    
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
        
    def create_profile(self):
        profile = {
            'display_name': "display_name",
            'avatar': File(open('profiles/tmp/cute-avatar.jpeg', 'rb')),
            'bio': "bio here"}
        response = self.client.post(reverse('api_v1:profiles:profile'), 
                                    profile)
        
        return response
        
class TestProfileListCreate(ProfilesAPITestCase):
    
    def test_create_profile_with_auth(self):
        self.authenticate()
        response = self.create_profile()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        res = self.client.get(reverse('api_v1:profiles:profile'))
        self.assertEqual(res.data[0]['display_name'], "display_name")
        self.assertEqual(res.data[0]['bio'], "bio here")
        
        profile = Profile.objects.get(id = response.data['id'])
        self.assertEqual(profile.display_name, "display_name")
        self.assertEqual(profile.bio, "bio here")

    def test_retrieves_authenticated_users_profile(self):
        pass