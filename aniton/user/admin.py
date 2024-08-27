from django.contrib import admin

from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    list_display = ('id', 'username', 'money', 'influence', 'number_of_friends')

admin.site.register(Profile, ProfileAdmin)