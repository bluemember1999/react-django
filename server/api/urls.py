from django.conf.urls import url
from .views import (
    TimezoneListView,
    TimezoneDetailView,
    UserListView,
    UserDetailView,
)

urlpatterns = [
    url(r'^timezone/$', TimezoneListView.as_view()),
    url(r'^timezone/(?P<pk>(\w+))/$', TimezoneDetailView.as_view()),
    url(r'^user/$', UserListView.as_view()),
    url(r'^user/(?P<pk>(\w+))/$', UserDetailView.as_view()),
]