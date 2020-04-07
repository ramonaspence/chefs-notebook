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

    owner = UserSerializer() ## for some reason allows profile details to be in recipe object in backend, I don't quite understand this fully
    owner = serializers.ReadOnlyField(source='owner.username')
    ## owner = UserSerializer() allows for nested serializer in api endpoint
    ## owner = serialziers.ReadOnlyField sets the owner automatically
    ## but these two lines conflict each other, how to separate them and achieve same functionality?

    class Meta:
        model = Recipe
        fields = '__all__' ##['title', 'description', 'image', 'ingredients', 'instructions', 'tags',]
        depth = 1

    ## modified create method to save recipe before adding tags from clarifai api
    ## because tags is a ManyToManyField, tags must be defined before saving to an instance of recipe
    ## once the recipe is saved, and the tags are defined in the db, a relationship between them can be made
    ## this create method is how I'm doing that.
    def create(self, validated_data):

        recipe = Recipe.objects.create(**validated_data)
        model = app.public_models.food_model ## specifies food_model for api prediction
        response = model.predict_by_url(recipe.image.url)
        ## instead of digging all the way into object returned by Clarifai, I need to slice results
        ## so I can go straight to the concepts that are brought back like below
        concepts = response['outputs'][0]['data']['concepts']
        concepts = concepts[0:5] ## just taking first five, the response from api is ordered by probability
        conceptlist = []
        for concept in concepts:
            concept = concept.get('name')
            conceptlist.append(concept)
        print(conceptlist)
        ## now loop through the concepts, check if they exist in db, if they don't, save to database.
        ## and if they do exist, save appropriate tags to recipe instance.
        # import pdb; pdb.set_trace()
        for concept in conceptlist:

            if Tag.objects.filter(name=concept).exists():
                tag = Tag.objects.get(name=concept)
                recipe.tags.add(tag)

            else:
                tag = Tag.objects.create(name=concept)
                recipe.tags.add(tag)
        recipe.save() ## saves recipe instance with tags added
        return recipe
