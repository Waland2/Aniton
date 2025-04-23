from .models import Review

from random import random, randint, choice

from aniton.config import *
from .serializers import ReviewSerializer
from aniton.config import *

def generate_rating():

    arr = []
    for i in range(1, 11):
        arr += [i] * RATING_PROBABILITY[i]

    rn_num = choice(arr)
    rn_num += min(round(random(), 1), 0.9)
    rn_num = min(rn_num, 10.0)

    return rn_num
    
def get_reviews(anime_rating, profile):
    query_set = Review.objects.filter(min_rating__lte=anime_rating, max_rating__gte=anime_rating).order_by('?')[:REVIEWS_PER_ANIME]
    reviews = ReviewSerializer(query_set, many=True).data

    for review in reviews:
        for key in ['text_eng', 'text_rus']:
            review[key] = review[key].replace("{:studioname}", f"<b>{profile.studio_name}</b>")

    return reviews

def get_profit(rating, profile):
    profit_ratio = profile.profit_ratio
    
    money_profit = int(profit_ratio * randint(*RATING_MULTIPLIES_ON_PROFIT[int(rating)]) * (1 + rating % 1))

    influence_profit = int(money_profit / INFLUENCE_DIVISION_RATIO)
    return money_profit, influence_profit

