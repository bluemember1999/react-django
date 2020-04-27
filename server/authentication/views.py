from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework_jwt.views import JSONWebTokenAPIView
from .models import User
from .serializers import (
    CustomJSONWebTokenSerializer,
    UserSerializer,
)
from .utils import get_jwt_token

class LoginView(JSONWebTokenAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = CustomJSONWebTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.object.get('user') or request.user
        token = serializer.object.get('token')
        response_data = {
            'token': token,
            'user': UserSerializer(user).data
        }

        return Response(response_data)
    
class RegisterView(CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        response_data = {
            'token': get_jwt_token(user),
            'user': serializer.data,
        }

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
