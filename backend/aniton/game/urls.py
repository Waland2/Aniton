from django.urls import path

from .views import *
urlpatterns = [
    path('createanime', CreateAnime.as_view())
]
