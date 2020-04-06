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

User = get_user_model()


class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsOwnerOrReadOnly]

class RecipeListByFollowers(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):
        # import pdb; pdb.set_trace()
        return Recipe.objects.filter(owner__following__owner=self.request.user).order_by('-date_updated')
        #owner__connection__following brings back people who follow ME
        #owner__connection__owner brings back recipes by ME
        #owner__following__owner works as desired.


class RecipeProfileListView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]


    def get_queryset(self, **kwargs):
        ## this queryset defaults to all recipe objects except when user
        ## is not none: which in this case means there is no value to capture
        ## since there is, this filters based on user's primary key coming from urlconf
        ## this allows for an api endpoint that lists recipes by the author
        ## instead of filtering by the logged in user
        queryset = Recipe.objects.all()
        # import pdb; pdb.set_trace()
        user = self.kwargs['pk']
        if user is not None:
            queryset = queryset.filter(owner__id=user)
        return queryset


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RecipeFilter
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

        ## perform_create method allows me to automatically save the logged in user as author to the Recipe instance.
    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


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

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):

        recipe_id = self.kwargs['pk']
        return Comment.objects.filter(recipe = recipe_id)

    def perform_create(self, serializer, **kwargs):
        # import pdb; pdb.set_trace()
        recipe = get_object_or_404(Recipe, pk=self.kwargs['pk']) ## grabs recipe instance, so I can assign the object, instead of the id

         ##saves self.request.user as author when creating a comment
        serializer.save(recipe = recipe, owner = self.request.user) ## saves recipe object brought in by get_object_or_404

class CommentRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]
