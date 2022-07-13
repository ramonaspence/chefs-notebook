from django.urls import reverse
from django.core.files import File
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from profiles.models import Profile, Connection
from accounts.models import User

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
    
    def create_connection(self):
         # two users with two profiles
        # one follower and one following
        # the "owner" of a Connection is the user who clicks the follow button
        # the "following" is the user being followed (rename to "followed"?)
        self.authenticate()
        self.create_profile()
        # create and login new user
        res = self.client.post('/dj-rest-auth/registration/', {
            'username': "follower", 'email': "follower@example.com",
            'password1': "pas$w0rd", 'password2': "pas$w0rd"})
        token = Token.objects.get(user__username="follower")
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token}")
        # create profile for the new user
        profile = {
            'display_name': "follower",
            'avatar': File(open('profiles/tmp/cute-avatar.jpeg', 'rb')),
            'bio': "bio here"}
        self.client.post(reverse('api_v1:profiles:profile'), profile)
        # create connection
        response = self.client.post(reverse('api_v1:profiles:connections'),
                                            {'following': 1})
        
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

    def test_profile_owner_is_authenticated_user(self):
        self.authenticate()
        response = self.create_profile()
        self.assertEqual(response.data['owner']['id'], 1)
        self.assertEqual(response.data['owner']['username'], 'username')
        
class TestProfileDetailView(ProfilesAPITestCase):
    
    def test_retrieves_single_profile(self):
        self.authenticate()
        self.create_profile()
        owner_id = 1
        response = self.client.get(reverse('api_v1:profiles:profile_detail',
                                           kwargs={'pk': owner_id}))
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data['owner']['id'], owner_id)
        
class TestProfileRetrieveUpdateView(ProfilesAPITestCase):
    
    def test_retrieves_authenticated_user_profile(self):
        self.authenticate()
        self.create_profile()
        owner_id = 1
        response = self.client.get(reverse('api_v1:profiles:user_profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, dict)
        self.assertEqual(response.data['owner']['id'], owner_id)
        
class TestConnectionListCreateView(ProfilesAPITestCase):
    
    def test_creates_connection(self):
        response = self.create_connection()
        followed_id = 1
        owner_id = 2
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['following']['id'], followed_id)
        self.assertEqual(response.data['owner']['id'], owner_id)
        
    def test_lists_all_connections(self):
        self.create_connection()
        response = self.client.get(reverse('api_v1:profiles:connections'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        self.assertGreater(len(response.data), 0)
        
class TestConnectionRetrieveDestroyView(ProfilesAPITestCase):
    
    def test_destroys_one_connection(self):
        self.create_connection()
        previous_connection_count = Connection.objects.all().count()
        self.assertGreater(previous_connection_count, 0)
        self.assertEqual(previous_connection_count, 1)
        res = self.client.delete(reverse('api_v1:profiles:remove_connection',
                                kwargs = {'pk': 1}))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Connection.objects.all().count(),
                         previous_connection_count - 1)
        self.assertEqual(Connection.objects.all().count(), 0)  
        

class TestFollowingListView(ProfilesAPITestCase):
    
    def test_lists_following(self):
        self.create_connection()
        # token = Token.objects.get(user__username="username")
        # self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
        user = User.objects.get(username="username")
        self.client.force_authenticate(user)
        self.client.post(reverse('api_v1:profiles:connections'), 
                                {'following': 2})
        
        response = self.client.get(reverse('api_v1:profiles:list_following', 
                                           kwargs = {'pk': 2}))
        self.assertEqual(response.data[0]['following']['id'], 1)
        self.assertEqual(response.data[0]['owner']['id'], 2)
        response = self.client.get(reverse('api_v1:profiles:list_following', 
                                           kwargs={'pk': 1}))
        
        self.assertEqual(response.data[0]['following']['id'], 2)
        self.assertEqual(response.data[0]['owner']['id'], 1)
        
    def test_lists_followers(self):
        self.create_connection()
        user = User.objects.get(username="username")
        self.client.force_authenticate(user)
        self.client.post(reverse('api_v1:profiles:connections'), 
                                {'following': 2})
        
        response = self.client.get(reverse('api_v1:profiles:list_followers', 
                                           kwargs = {'pk': 2}))
        self.assertEqual(response.data[0]['following']['id'], 2)
        self.assertEqual(response.data[0]['owner']['id'], 1)
        
        response = self.client.get(reverse('api_v1:profiles:list_followers', 
                                            kwargs = {'pk': 1}))
        self.assertEqual(response.data[0]['following']['id'], 1)
        self.assertEqual(response.data[0]['owner']['id'], 2)
                