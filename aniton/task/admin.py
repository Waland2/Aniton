from django.contrib import admin

from .models import Task

class TaskAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('id', 'type', 'title_eng', 'money_reward', 'influence_reward')


admin.site.register(Task, TaskAdmin)