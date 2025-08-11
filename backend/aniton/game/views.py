
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
        print("blabla")
        anime_timeout = cache.get(f"{request.profile.id}_anime_timeout")
        if anime_timeout:
            return Response({'error': 'timeout', 'time_to_end': cache.ttl(f"{request.profile.id}_anime_timeout")}, 400)
        print("blabla2")

        rating = utils.generate_rating()
        reviews = utils.get_reviews(rating, request.profile)
        money_profit, influence_profit = utils.get_profit(rating, request.profile)

        print("blabla3")

        types_translation = {
            "Series": "Сериал",
            "Movie": "Фильм",
            "Short Film": "Короткометражка"
        }

        anime_data = dict()
        print("blabla4")
        print(request.profile)
        anime_data['creator'] = request.profile
        print(request.data)
        anime_data['name'] = request.data['name']
        anime_data['type'] = types_translation[request.data['type']]
        anime_data['number_of_series'] = int(request.data['number_of_series'])

        anime_data['rating'] = rating
        anime_data['money_profit'] = money_profit
        anime_data['influence_profit'] = influence_profit
        print("blabla5")

        Anime.objects.create(**anime_data)
        request.profile.money += money_profit
        request.profile.influence += influence_profit
        request.profile.save()

        print("blabla6")
        anime_timeout = request.profile.timeout_after_creating

        cache.set(f"{request.profile.id}_anime_timeout", anime_timeout, timeout=timedelta(minutes=anime_timeout).total_seconds())
        print("blabla7")

        return Response({
            'rating': rating,
            'money_profit': money_profit,
            'influence_profit': influence_profit, 
            'reviews': reviews,
            'timeout': anime_timeout * 60
        })
