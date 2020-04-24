from rest_framework import serializers
from authentication.models import User
from .models import Timezone

class TimezoneSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Timezone
        fields = '__all__'
        read_only_fields = ('id',)
