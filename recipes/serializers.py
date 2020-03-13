from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        author = serializers.ReadOnlyField(source='author.username')
        depth = 1
