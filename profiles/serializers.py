from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer

class ConnectionSerializer(serializers.ModelSerializer):
    following = UserSerializer(read_only=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Connection
        fields = '__all__'
        depth = 1

class ProfileSerializer(serializers.ModelSerializer):
    
    following = ConnectionSerializer(many=True, allow_null=True, required=False, source='get_following')
    followers = ConnectionSerializer(many=True, allow_null=True, required=False, source='get_followers')

    class Meta:
        model = Profile
        fields = '__all__' 
        depth = 1
