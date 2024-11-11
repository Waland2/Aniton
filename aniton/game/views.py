
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from django_redis import get_redis_connection

from .models import Anime
from . import utils

from random import *
        
class CreateAnime(APIView):
    def post(self, request):
        
        anime_timeout = cache.get(f"{request.profile.id}_anime_timeout")
        if anime_timeout:
            return Response({'error': 'timeout', 'time_to_end': cache.ttl(f"{request.profile.id}_anime_timeout")}, 400)

        rating = utils.generate_rating()
        reviews = utils.get_reviews(rating, request.profile)
        money_profit, influence_profit = utils.get_profit(rating, request.profile)


        types_translation = {
            "Сериал": "Series",
            "Фильм": "Movie",
            "Короткометражка": "Short Film"
        }

        anime_data = dict()

        anime_data['creator'] = request.profile

        anime_data['name'] = request.data['name']
        anime_data['type'] = types_translation[request.data['type']]
        anime_data['number_of_series'] = int(request.data['number_of_series'])

        anime_data['rating'] = rating
        anime_data['money_profit'] = money_profit
        anime_data['influence_profit'] = influence_profit

        Anime.objects.create(**anime_data)
        request.profile.money += money_profit
        request.profile.influence += influence_profit
        request.profile.save()

        anime_timeout = request.profile.timeout_after_creating

        cache.set(f"{request.profile.id}_anime_timeout", anime_timeout, timeout=timedelta(minutes=anime_timeout).total_seconds())

        return Response({
            'rating': rating,
            'money_profit': money_profit,
            'influence_profit': influence_profit, 
            'reviews': reviews,
            'timeout': anime_timeout * 60
        })
