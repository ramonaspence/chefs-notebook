from rest_framework import serializers
from .models import *

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        author = serializers.ReadOnlyField(source='author.username')

    # def create(self, validated_data):
    #     import pdb; pdb.set_trace()

# class RecipeCreateSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(max_length=None, use_url=True, required=False)
#
#
#     class Meta:
#         model = Recipe
#         fields = ['title', 'description', 'ingredients', 'image', 'instructions',]
