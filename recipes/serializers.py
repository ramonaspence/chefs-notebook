from rest_framework import serializers
from .models import *
from django.conf import settings

from accounts.serializers import UserSerializer

import json

from clarifai.rest import ClarifaiApp
CLARIFAI_KEY = settings.CLARIFAI_API_KEY


app = ClarifaiApp() ## brings in an instance of Clarifai 'app'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        owner = serializers.ReadOnlyField(source='owner.username')
        depth = 1

class RecipeSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    owner = UserSerializer(read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__' 
        depth = 1
        owner = serializers.ReadOnlyField(source='owner.username')

  
    def create(self, validated_data):
        """
        Grabs `tags` from Clarifai and checks if the `tags` are in the db.
        If they already exist, they are added to the recipe and the recipe is saved.
        If they do not exist, they are saved to the db, then added to recipe, and the recipe is saved.
        """
        recipe = Recipe.objects.create(**validated_data)

        model = app.public_models.food_model 
        if recipe.image != None:
            response = model.predict_by_url(recipe.image.url)
            concepts = response['outputs'][0]['data']['concepts']
            concepts = concepts[0:5] 
            conceptlist = []
            for concept in concepts:
                concept = concept.get('name')
                conceptlist.append(concept)
            print(conceptlist)
            for concept in conceptlist:

                if Tag.objects.filter(name=concept).exists():
                    tag = Tag.objects.get(name=concept)
                    recipe.tags.add(tag)

                else:
                    tag = Tag.objects.create(name=concept)
                    recipe.tags.add(tag)
            recipe.save() 
            return recipe
        else:
            recipe.save()
            return recipe
