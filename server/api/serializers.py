from rest_framework import serializers
from authentication.models import User
from authentication.serializers import UserSerializer
from .models import Timezone

class TimezoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Timezone
        fields = '__all__'
        read_only_fields = ('id', 'user')
    
    def to_representation(self, instance):
        res = super(TimezoneSerializer, self).to_representation(instance)
        if instance.user:
          res['user'] = UserSerializer(instance.user).data['username']

        return res

