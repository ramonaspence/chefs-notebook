from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__' ##['display_name', 'bio', 'avatar', 'date_joined',] 
        depth = 1
