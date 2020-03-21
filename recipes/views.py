from rest_framework import generics

from django.shortcuts import get_object_or_404

from .models import Recipe, Comment
from .serializers import *
from django.conf import settings
from .filters import RecipeFilter
from django_filters import rest_framework as filters




class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)

    filterset_fields = ['title', 'description', 'author', 'tags']

        ## perform_create method allows me to automatically save the logged in user as author to the Recipe instance.
    def perform_create(self, serializer):
        serializer.save(author = self.request.user)
        ##serializer.save(tags = clarifai response)  ## this may be a way to implement auto-tagging with the clarifai api

    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(author = user)

    # def list(self, request, *args, **kwargs):
    #     response = super(RecipeListView, self).list(self, request, args, kwargs)
    #     # import pdb; pdb.set_trace()
    #     response.data.append(RecipeFilter(self.request.GET, queryset=self.get_queryset()))
    #     return response


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
        recipe = get_object_or_404(Recipe, pk=self.kwargs['pk']) ## grabs recipe instance, so I can assign the object, instead of the id

         ##saves self.request.user as author when creating a comment
        serializer.save(recipe = recipe, author = self.request.user) ## saves recipe object brought in by get_object_or_404

class CommentRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
