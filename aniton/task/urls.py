from django.urls import path

from .views import *

urlpatterns = [
    path('daily', DailyTaskCollect.as_view()),
    path('tasks', GetTasksList.as_view()), 
    path('complete/<int:task_id>', CompleteTask.as_view())
]
