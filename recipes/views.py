from rest_framework import generics

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


class RecipeProfileListView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self, **kwargs):
        user = get_object_or_404(User, pk = self.kwargs['id'])
        queryset = Recipe.objects.filter(author = user)


class RecipeListView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RecipeFilter

        ## perform_create method allows me to automatically save the logged in user as author to the Recipe instance.
    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

        ## get_queryset method currently renders the recipes authored by the logged in user.
        ## should render recipes belonging to the rendered profile's user
        ## for instance: when I go to luke's profile, I should see luke's recipes rendered.
        ## the user.id can be passed from profileview to recipelistview. But how to filter on the frontend?





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
