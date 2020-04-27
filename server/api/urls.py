from django.conf.urls import url
from rest_framework.routers import SimpleRouter
from .views import (
    TimezoneViewSet,
    UserViewSet,
)

router = SimpleRouter()
router.register(r'timezone', TimezoneViewSet)
router.register(r'user', UserViewSet)

urlpatterns = router.urls