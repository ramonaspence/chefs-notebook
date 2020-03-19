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


    def create(self, validated_data):
        tags = validated_data.pop('tags')
        # import pdb; pdb.set_trace()

        recipe = Recipe.objects.create(**validated_data)
        model = app.public_models.food_model ## specifies food_model for api prediction
        response = model.predict_by_url(recipe.image.url)
        for concepts in response:
            for concepts in output:
                print(name)
        import pdb; pdb.set_trace()
        # if response.objects.filter()

        # iterate over your tags to see if they exist
        # if the do not, create them


        # once all tags exists, add a relationship for each one to the recipe



        # import pdb; pdb.set_trace()

        # return recipe
