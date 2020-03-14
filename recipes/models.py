from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth import admin



User = get_user_model()


class Recipe(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True)
    date_published = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now_add=True)
    tags = models.CharField(max_length=50)


    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True)
    body = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author
