from django.db import models
from django.contrib.auth import get_user_model
from recipes.models import Recipe

User = get_user_model();


class Profile(models.Model):
    user = models.OneToOneField(User, blank=True, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to="images/")
    bio = models.TextField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)
    # followers = models.ManyToManyField(self)

    def __str__(self):
        return self.user.username

    def get_following(self):
        return Connection.objects.filter(user=self.user) ## filters from connection model's fields


    def get_followers(self):
        # import pdb; pdb.set_trace()
        return Connection.objects.filter(following=self.user) ## filters from connection model's fields

## Connection model used to set up a following system. ie: I can follow you and/or you can follow me.

class Connection(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE) ##the user who chooses to follow
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following") ## the set of users who get followed by user field above

    def __str__(self):
        return self.user.username
