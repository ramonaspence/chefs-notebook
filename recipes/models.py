from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth import admin



User = get_user_model()

class Ingredient(models.Model):
    name = models.CharField(max_length=155)
    unit = models.CharField(max_length=25, default=None)
    quantity = models.FloatField(max_length=15, default=None)

    def __str__(self):
        return self.name

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
