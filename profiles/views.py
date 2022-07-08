from rest_framework import generics, permissions, authentication
from .permissions import IsOwnerOrReadOnly
from .models import Profile
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

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
    

class ConnectionListCreateAPIView(generics.ListCreateAPIView): ## view to create and read followers and followings
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        following = get_object_or_404(User, pk=self.request.data['following'])
        serializer.save(owner=self.request.user, following=following);


class ConnectionRetrieveDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [IsOwnerOrReadOnly]


class FollowingListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self, **kwargs):
        if (self.kwargs):
            user = self.kwargs['pk']
        else:
            return Connection.objects.filter(owner = self.request.user)
        if user is not None:
            queryset = queryset.filter(owner__profile__owner=user)
            return queryset
        else:
            return Connection.objects.filter(owner = self.request.user)


class FollowerListView(generics.ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]
 