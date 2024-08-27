from django.urls import path

from .views import *
urlpatterns = [
    path('newfriend', NewFriend.as_view())
]
