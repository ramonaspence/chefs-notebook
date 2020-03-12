from rest_framework import generics
from .models import Profile

from .serializers import *


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
