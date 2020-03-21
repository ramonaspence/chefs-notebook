from rest_framework import generics
from django_filters import rest_framework as filters
from .models import Recipe


class RecipeFilter(filters.FilterSet):
    class Meta:
        model = Recipe
        fields = ['title', 'description']
