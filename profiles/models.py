from django.db import models
from django.contrib.auth import get_user_model
from recipes.models import Recipe

User = get_user_model();


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="images/", blank=True)
    bio = models.TextField(max_length=255)
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    followers = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user
