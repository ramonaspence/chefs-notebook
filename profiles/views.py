from rest_framework import generics
from .models import Profile
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from .serializers import *

User = get_user_model()

class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)

class ProfileCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)

class ConnectionListCreateAPIView(generics.ListCreateAPIView): ## view to create and read followers and followings
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
