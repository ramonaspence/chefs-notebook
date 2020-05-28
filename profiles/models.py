from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
    owner = models.OneToOneField(User, blank=True, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to="images/")
    bio = models.TextField(max_length=255, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.owner.username

    def get_following(self):
        return Connection.objects.filter(owner=self.owner) ## filters from connection model's fields


    def get_followers(self):
        return Connection.objects.filter(following=self.owner)

## Connection model used to set up a following system. ie: I can follow you and/or you can follow me.

class Connection(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE) ##the user who chooses to follow
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")

    def __str__(self):
        return self.owner.username
