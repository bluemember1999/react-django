from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_jwt.utils import jwt_payload_handler, jwt_encode_handler

def authenticate(username, password):
    User = get_user_model()
    print(username)
    if not username or not password:
        return None
    
    if username:
        user_filter = User.objects.filter(Q(username=username) | Q(email=username))
    else:
        return None
    
    user = user_filter.first()

    if not user or not user.check_password(password):
        return None
    
    return user

def get_jwt_token(user):
    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)

    return token