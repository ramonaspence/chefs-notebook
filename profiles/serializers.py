from rest_framework import serializers
from .models import *


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = '__all__'
        depth = 1

class ProfileSerializer(serializers.ModelSerializer):
    following = ConnectionSerializer(many=True, source='get_following')
    followers = ConnectionSerializer(many=True, source='get_followers')

    class Meta:
        model = Profile
        fields = '__all__' ##['display_name', 'bio', 'avatar', 'date_joined',]
        depth = 1
