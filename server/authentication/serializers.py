from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from .models import User
from .utils import authenticate, get_jwt_token

class CustomJSONWebTokenSerializer(JSONWebTokenSerializer):
    def validate(self, attrs):
        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password')
        }

        if not credentials[self.username_field]:
            msg = _('Must include "{username_field}" and "password".')
            msg = msg.format(username_field=self.username_field)
            raise serializers.ValidationError(msg)

        else: 
            user = authenticate(credentials[self.username_field], credentials['password'])

            if user:
                return {
                    'token': get_jwt_token(user),
                    'user': user,
                }
            else:
                msg = _('Invalid username or password.')
                raise serializers.ValidationError(msg)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'role')

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'role')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': { 'write_only': True },
        }
    
    def create(self, validated_data):
        user = super(UserCreateSerializer, self).create(validated_data)
        password = validated_data.get('password')
        user.set_password(password)
        user.save()

        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'role')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': { 'write_only': True, 'required': False },
        }
    
    def update(self, validated_data):
        user = super(UserUpdateSerializer, self).update(validated_data)

        if 'password' in validated_data:
            user.set_password(validated_data['password'])
        
        user.save()

        return user
