from django.core.cache import cache

from datetime import datetime
class PassiveIncomeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if hasattr(request, 'profile') and request.profile.passive_income > 0:
            now_timestamp = int(datetime.now().timestamp())

            last_timestamp = cache.get(f"{request.profile.id}_passive")

            if last_timestamp is None:
                last_timestamp = now_timestamp - 3

            time = now_timestamp - last_timestamp

            # 1 hour : passive_income
            # time / 3600 : x
            x = int(time / 3600 * request.profile.passive_income)   
            
            if x > 0:
                request.passive_profit = x
                request.profile.money += x

                cache.set(f"{request.profile.id}_passive", now_timestamp, timeout=None)
                request.profile.save()

        response = self.get_response(request)
        return response


    
