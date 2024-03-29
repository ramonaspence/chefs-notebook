from rest_framework import generics, permissions, authentication
from .permissions import IsOwnerOrReadOnly
from .models import Profile
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
import json
from .serializers import *

User = get_user_model()


class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

  
class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]


class ProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    authentication_classes = [authentication.TokenAuthentication]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, owner=self.request.user)
        return obj
    

class ConnectionListCreateAPIView(generics.ListCreateAPIView): 
    ## view is used to create a connection between users
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # the user who clicks follow button (self.requst.user) is following
        following = get_object_or_404(User, 
                pk = self.request.data['following'])
        serializer.save(owner=self.request.user, following=following);


class ConnectionRetrieveDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # view used for deleting a connection
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [IsOwnerOrReadOnly]


class FollowingListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, **kwargs):
        if (self.kwargs):
            owner = self.kwargs['pk']
            return Connection.objects.filter(owner = owner)


class FollowerListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        if (self.kwargs):
            following = self.kwargs['pk']
            return Connection.objects.filter(following = following)
 