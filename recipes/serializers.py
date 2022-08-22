import json

from rest_framework import serializers
from .models import *
from django.conf import settings
from accounts.serializers import UserSerializer

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc, service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2


stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())

        
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
       
    """
    Try moving clarifai code to the create method of the listcreateAPIView called RecipeListView
    """
  
    def create(self, validated_data):
        """
        Grabs `tags` from Clarifai and checks if the `tags` are in the db.
        If they already exist, they are added to the recipe and the recipe is saved.
        If they do not exist, they are saved to the db, then added to recipe, and the recipe is saved.
        """
        recipe = Recipe.objects.create(**validated_data)
        metadata = (('authorization', f'Key {settings.CLARIFAI_API_KEY}'),)

        if recipe.image != None:
            request = service_pb2.PostModelOutputsRequest(
            # This is the model ID of a publicly available General model.
                model_id = 'bd367be194cf45149e75f01d59f77ba7',
                user_app_id = resources_pb2.UserAppIDSet(app_id=settings.CLARIFAI_APP_ID),
                inputs = [
                    resources_pb2.Input(data=resources_pb2.Data(image=resources_pb2.Image(url=recipe.image.url)))
                    ])
            response = stub.PostModelOutputs(request, metadata=metadata)
            if response.status.code != status_code_pb2.SUCCESS:
                print("There was an error with your request!")
                print("\tCode: {}".format(response.outputs[0].status.code))
                print("\tDescription: {}".format(response.outputs[0].status.description))
                print("\tDetails: {}".format(response.outputs[0].status.details))
                raise Exception("Request failed, status code: " + str(response.status.code))

            concepts = response.outputs[0].data.concepts[0:6]
            for concept in concepts:
                concept = concept.name
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


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
        depth = 1
