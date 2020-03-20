from rest_framework import serializers
from .models import *

from django.conf import settings
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
        author = serializers.ReadOnlyField(source='author.username')
        depth = 1

class RecipeSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    ## http://www.cdrf.co/3.9/rest_framework.serializers/ModelSerializer.html
    ## If there are many to many fields present on the instance then they
    ##    cannot be set until the model is instantiated, in which case the
    ##    implementation is like so:
    ##
    ##        example_relationship = validated_data.pop('example_relationship')
    ##        instance = ExampleModel.objects.create(**validated_data)
    ##        instance.example_relationship = example_relationship
    ##        return instance

    class Meta:
        model = Recipe
        fields = '__all__' ##['title', 'description', 'image', 'ingredients', 'instructions', 'tags',]
        author = serializers.ReadOnlyField(source='author.username') ## was used//not commented out


    ## modified create method to save recipe before adding tags from clarifai api
    ## because tags is a ManyToManyField, tags must be defined before saving to an instance of recipe
    ## once the recipe is saved, and the tags are defined in the db, a relationship between them can be made
    ## this create method is how I'm doing that.
    def create(self, validated_data):
        tags = validated_data.pop('tags')
        # import pdb; pdb.set_trace()

        recipe = Recipe.objects.create(**validated_data)
        model = app.public_models.food_model ## specifies food_model for api prediction
        response = model.predict_by_url(recipe.image.url)
        concepts = response['outputs'][0]['data']['concepts']
        print(concepts)
        ## instead of digging all the way into this json object, I need to slice results
        ## so I can go straight to the concepts that are brought back! Whooo!
        # import pdb; pdb.set_trace()
        for concept in concepts:
            if Tag.objects.filter(name=concept).exists(): ## checks if concepts already exist in db at '/api/v1/recipes/tags'
                validated_data.append(concepts) ## this needs to be refactored
            else:
                tags = Tag.objects.create(name=concept) ## throws error bc 'concepts' is over 255 chars.
                
        return recipe ## tags will be added by this point.
        # import pdb; pdb.set_trace()
        # if response.objects.filter()

        # iterate over your tags to see if they exist
        # if the do not, create them


        # once all tags exists, add a relationship for each one to the recipe



        # import pdb; pdb.set_trace()

        # return recipe
