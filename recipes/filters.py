from rest_framework import generics

import django_filters
from django_filters import rest_framework as filters
from .models import Recipe, Tag


class RecipeFilter(filters.FilterSet):
    """ filter is automatically looking for the 'pk' of the tag
        and therefore it needs to be changed so that it looks to
        match with the name of the tag instead of the integer 'pk'"""

    tags = django_filters.ModelMultipleChoiceFilter(
        field_name='tags__name',
        to_field_name='name',
        lookup_expr='icontains',
        queryset=Tag.objects.all()
        )

    class Meta:
        model = Recipe
        fields = {
            'title': ['icontains'],
            'description': ['icontains'],
            # 'tags': ['icontains']
        }
