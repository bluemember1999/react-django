from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Timezone
from .serializers import TimezoneSerializer
from authentication.models import User
from authentication.serializers import UserSerializer, UserUpdateSerializer
from authentication.utils import get_jwt_token

class TimezoneListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
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
    serializer_class = UserSerializer

    def get_queryset(self):
        user_role = self.request.user.role

        if user_role == 'USER':
            return User.objects.none()
        return User.objects.all()

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserSerializer
    
    def retrieve(self, request):
        serializer_class = self.get_serializer_class()
        data = serializer_class(request.user).data

        return Response(data)
    
    def partial_update(self, request):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            instance=request.user,
            data=request.data,
            context={'request': request},
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response_data = {
            'token': get_jwt_token(user),
            'user': UserSerializer(user).data,
        }

        return Response(response_data)

