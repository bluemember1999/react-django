from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q
from .models import Timezone
from .serializers import TimezoneSerializer
from authentication.models import User
from authentication.serializers import UserSerializer
from authentication.utils import get_jwt_token

class TimezoneListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    serializer_class = TimezoneSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        user_role = self.request.user.role
        
        if user_role == 'MANAGER':
            return Timezone.objects.none()
        elif user_role == 'ADMIN':
            return Timezone.objects.all()
        return Timezone.objects.filter(user=user_id)            

class TimezoneDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = TimezoneSerializer
    queryset = Timezone.objects.all()

class UserListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    search_fields = ['username']
    filter_backends = (filters.SearchFilter,)
    serializer_class = UserSerializer

    def get_queryset(self):
        user_role = self.request.user.role

        if user_role == 'USER':
            return User.objects.none()
        elif user_role == 'MANAGER':
            return User.objects.filter(Q(role='USER') | Q(role='MANAGER'))
        return User.objects.all()

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


