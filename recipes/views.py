from rest_framework import generics

from .models import Recipe, Ingredient
from .serializers import *


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer, **kwargs):
        # import pdb; pdb.set_trace();
        serializer.save(author = self.request.user)


# class RecipeCreateView(generics.ListCreateAPIView):
#     serializer_class = RecipeCreateSerializer
#     queryset = Recipe.objects.all()
#
#
#     def create(self, validated_data):
#         import pdb; pdb.set_trace()
#         validated_data['author'] = self.request.user
#         return super(RecipeCreateView, self).create(validated_data)
