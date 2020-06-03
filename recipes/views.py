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
    authentication_classes = [authentication.TokenAuthentication]

class RecipeListByFollowers(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):
        return Recipe.objects.filter(owner__following__owner=self.request.user).order_by('-date_updated')
        


class RecipeProfileListView(generics.ListAPIView):
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


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RecipeFilter
    permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [authentication.TokenAuthentication]



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
        recipe = get_object_or_404(Recipe, pk=self.kwargs['pk']) ## grabs recipe instance, so I can assign the object, instead of the id
        serializer.save(recipe = recipe, owner = self.request.user)

class CommentRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]
