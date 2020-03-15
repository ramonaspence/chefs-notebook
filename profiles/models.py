from django.db import models
from django.contrib.auth import get_user_model
from recipes.models import Recipe

User = get_user_model();


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to="images/")
    bio = models.TextField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.display_name

class Follow(models.Model):
    follower = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='following')
