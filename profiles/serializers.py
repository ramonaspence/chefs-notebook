from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer

class ConnectionSerializer(serializers.ModelSerializer):
    following = UserSerializer()

    class Meta:
        model = Connection
        fields = '__all__'
        depth = 1

class ProfileSerializer(serializers.ModelSerializer):
    ## lines 12 and 13 define fields that are added to the Profile model upon creation.
    ## they're created in the get_following and get_followers method in the serializers.py
    following = ConnectionSerializer(many=True, allow_null=True, required=False, source='get_following')
    followers = ConnectionSerializer(many=True, allow_null=True, required=False, source='get_followers')

    class Meta:
        model = Profile
        fields = '__all__' ##['display_name', 'bio', 'avatar', 'date_joined',]
        depth = 2
