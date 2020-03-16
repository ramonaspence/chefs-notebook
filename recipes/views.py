from rest_framework import generics

from django.shortcuts import get_object_or_404

from .models import Recipe, Comment
from .serializers import *


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer, **kwargs):
        serializer.save(author = self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(author = user)

class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):

        recipe_id = self.kwargs['pk']
        return Comment.objects.filter(recipe = recipe_id)

    def perform_create(self, serializer, **kwargs):
        # import pdb; pdb.set_trace()
        recipe = get_object_or_404(Recipe, pk=self.kwargs['pk'])

        serializer.save(author = self.request.user) ##saves self.request.user as author when creating a comment
        serializer.save(recipe = recipe) ##tries to save the integer to recipe field, but this field is looking for an object

class CommentRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
