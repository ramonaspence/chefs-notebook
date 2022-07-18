from rest_framework.test import APITestCase
from django.core.files import File

from profiles.models import Profile, Connection
from accounts.models import User


class TestProfileModel(APITestCase):
    
    def test_str_method_returns_owner_username(self):
        user = User.objects.create(username="test_user")
        profile_data = {
            'display_name': "follower",
            'avatar': File(open('profiles/tmp/cute-avatar.jpeg', 'rb')),
            'bio': "bio here"}
        profile = Profile.objects.create(display_name = "user", avatar = File(
                                        open('profiles/tmp/cute-avatar.jpeg',
                                             'rb')), 
                                         bio = "bio here", owner = user) 
        self.assertEqual(str(profile), "test_user")
        
    def test_get_following(self):
        user1 = User.objects.create(username="test_user1")
        user2 = User.objects.create(username="test_user2")
        profile1 = Profile.objects.create(display_name = "test_user1", avatar = File(
                                        open('profiles/tmp/cute-avatar.jpeg',
                                             'rb')), 
                                         bio = "bio here", owner = user1)
        profile2 = Profile.objects.create(display_name = "test_user2", avatar = File(
                                        open('profiles/tmp/cute-avatar.jpeg',
                                             'rb')), 
                                         bio = "bio here", owner = user2)
        connection = Connection.objects.create(owner=user1, following=user2)
        data = Profile.get_following(profile1)
        self.assertEqual(data.count(), 1)
        self.assertEqual(str(data[0]), 'test_user1')
        data = Profile.get_following(profile2)
        self.assertEqual(data.count(), 0)
        
    def test_get_followers(self):
        user1 = User.objects.create(username="test_user1")
        user2 = User.objects.create(username="test_user2")
        profile1 = Profile.objects.create(display_name = "test_user1", avatar = File(
                                        open('profiles/tmp/cute-avatar.jpeg',
                                             'rb')), 
                                         bio = "bio here", owner = user1)
        profile2 = Profile.objects.create(display_name = "test_user2", avatar = File(
                                        open('profiles/tmp/cute-avatar.jpeg',
                                             'rb')), 
                                         bio = "bio here", owner = user2)
        
        
        

class TestCommentModel(APITestCase):
    
    def test_str_method_returns_owner_username(self):
        pass