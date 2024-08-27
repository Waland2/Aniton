
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/user/', include('user.urls')),
    path('api/v1/game/', include('game.urls')),
    path('api/v1/task/', include('task.urls')),
    path('api/v1/upgrade/', include('upgrade.urls')),
    path('api/v1/friend/', include('friend.urls')),
]
