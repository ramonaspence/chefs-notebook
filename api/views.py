from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecipeSerializer
from recipes.models import *

class RecipesView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
