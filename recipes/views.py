from rest_framework import generics

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
