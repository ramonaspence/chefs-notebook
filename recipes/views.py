from rest_framework import generics, permissions, authentication
from .permissions import IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404

from profiles.models import Profile
from .models import Recipe, Comment
from .serializers import *
from django.conf import settings
from .filters import RecipeFilter
from django_filters import rest_framework as filters
from django.contrib.auth import get_user_model

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc, service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2


stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())

User = get_user_model()


class RecipeListView(generics.ListCreateAPIView):
    """ View is used to create recipes and list them on the Explore page in 
    ../frontend/static/src/social-components/Explore.js
    
    When a recipe is created and before it is saved in the db, the image gets passed
    to Clarifai API, which then returns a set of 'tags'. The tags for the image of that
    recipe are then checked against the db. If the tags already exist, then the recipe gets
    saved. If the tags don't exist in the db already, they're saved, and then the recipe is
    saved. 
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RecipeFilter
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]
    
    def get_queryset(self):
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class RecipeProfileListView(generics.ListAPIView):
    # View is used to list recipes on someone's profile. 
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self, **kwargs):
        queryset = Recipe.objects.all()
        user = self.kwargs['pk']
        if user is not None:
            queryset = queryset.filter(owner__id=user)
        return queryset


class RecipeByFollowersListView(generics.ListAPIView):
    # View is used to list a user's followers' recipes on a user's dashboard
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):
        return Recipe.objects.filter(owner__following__owner=self.request.user).order_by('-date_updated')
    
    
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]


class RecipeUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]


class TagListCreateView(generics.ListCreateAPIView):
    # used to create and read tags
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):

        recipe_id = self.kwargs['pk']
        return Comment.objects.filter(recipe = recipe_id)

    def perform_create(self, serializer, **kwargs):
        # grabs recipe instance, in order to assign the object, instead of the id
        recipe = get_object_or_404(Recipe, pk=self.kwargs['pk']) 
        serializer.save(recipe = recipe, owner = self.request.user)

class CommentDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]
