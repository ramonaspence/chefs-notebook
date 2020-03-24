from rest_framework import generics
from .models import Profile
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from .serializers import *

User = get_user_model()

class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    


class ProfileUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        # import pdb; pdb.set_trace()
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj
    ## this method keeps me from seeing other people's profiles! I need them to be seen by others, but not be able to update them

    # def get_queryset(self):
    #     # import pdb; pdb.set_trace()
    #     user = self.request.user.id
    #     return Profile.objects.filter(user=user)


class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def get_queryset(self):
    #     user = self.request.user
    #     return Profile.objects.filter(user=user) ## this get_queryset method filters in the backend. Only letting me see what belongs to the user that is logged in

class ConnectionListCreateAPIView(generics.ListCreateAPIView): ## view to create and read followers and followings
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    def perform_create(self, serializer):
        following = get_object_or_404(User, pk=self.request.data['following'])
        serializer.save(user=self.request.user, following=following);

class ConnectionRetrieveDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer


class FollowingListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    def get_queryset(self):
        # import pdb; pdb.set_trace()
        return Connection.objects.filter(user = self.request.user)

class FollowerListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    def get_queryset(self):
        return Connection.objects.filter(following = self.request.user)
