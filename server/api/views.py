from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q
from .models import Timezone
from .serializers import TimezoneSerializer
from authentication.models import User
from authentication.serializers import UserSerializer

class TimezoneViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    search_fields = ['name']
    filter_backends = (SearchFilter,)
    serializer_class = TimezoneSerializer
    queryset = Timezone.objects.all()

    def get_queryset(self):
        queryset = super(TimezoneViewSet, self).get_queryset()
        user_id = self.request.user.id
        user_role = self.request.user.role
        
        if user_role == 'ADMIN':
            return queryset
        return queryset.filter(user=user_id)

class UserViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    search_fields = ['username']
    filter_backends = (SearchFilter,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = super(UserViewSet, self).get_queryset()
        user_role = self.request.user.role

        if user_role == 'USER':
            return queryset.none()
        elif user_role == 'MANAGER':
            return queryset.filter(Q(role='USER') | Q(role='MANAGER'))
        return queryset
