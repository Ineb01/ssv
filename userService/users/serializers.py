from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'password', 'email', 'groups']
        optional_fields = ['url', 'groups']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'groups': {'read_only': True},
            'url': {'read_only': True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user
        