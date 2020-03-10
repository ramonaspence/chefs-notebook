from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.Serializer):
    class Meta:
        model = Recipe
        fields = '__all__'
