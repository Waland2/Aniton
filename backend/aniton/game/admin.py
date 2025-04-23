from django.contrib import admin

from .models import Anime, Review


class AnimeAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'money_profit', 'influence_profit', 'creator')

admin.site.register(Anime, AnimeAdmin)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('text_eng', 'min_rating', 'max_rating')
        
admin.site.register(Review, ReviewAdmin)
