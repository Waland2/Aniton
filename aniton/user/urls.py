from django.urls import path
from .views import *

urlpatterns = [
    path('auth', UserAuth.as_view()),
    path('setname', SetStudioName.as_view()),
    path('setwallet', SetWallet.as_view()),
    path('stats', UserStats.as_view()),
]