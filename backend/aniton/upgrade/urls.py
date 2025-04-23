from django.urls import path
from .views import *

urlpatterns = [
    path('upgrades', GetUpgrades.as_view()),
    path('purchase/<int:upgrade_id>', PurchaseUpgrade.as_view())
]