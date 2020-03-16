from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = '__all__' ##['title', 'description', 'image', 'ingredients', 'instructions', 'tags',]
        author = serializers.ReadOnlyField(source='author.username') ## was used//not commented out
        depth = 1

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        author = serializers.ReadOnlyField(source='author.username')
        depth = 1
