from rest_framework import generics

from .models import Recipe, Ingredient
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
