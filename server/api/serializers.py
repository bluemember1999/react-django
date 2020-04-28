from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from authentication.models import User
from authentication.serializers import UserSerializer
from .models import Timezone
import re

class TimezoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timezone
        fields = '__all__'
        read_only_fields = ('id', 'user')
    
    def validate(self, attrs):
        difference_to_GMT = attrs.get('difference_to_GMT')
        symbol = difference_to_GMT[0]
        if not difference_to_GMT or symbol not in ['-', '+']:
            msg = _('Must include difference time to GMT')
            raise serializers.ValidationError(msg)
        
        else:
            numbers = re.findall('[0-9]+', difference_to_GMT)
            rules = [
                not numbers or len(numbers) != 2,
                symbol == '-' and int(numbers[0]) > 12,
                symbol == '+' and int(numbers[0]) > 14,
                numbers[1] not in ['00', '15', '30', '45']
            ]

            if any(rules):
                msg = _('Invalid value')
                raise serializers.ValidationError(msg)
            else:
                return attrs

    def to_representation(self, instance):
        res = super(TimezoneSerializer, self).to_representation(instance)
        if instance.user:
          res['user'] = UserSerializer(instance.user).data['username']

        return res

