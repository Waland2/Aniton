from django.db import models
from django.core.cache import cache

from datetime import datetime

class Upgrade(models.Model):
    name_eng = models.CharField(max_length=100, blank=True)
    name_rus = models.CharField(max_length=100, blank=True)
    image = models.ImageField(blank=True, upload_to="upgrades/")

    money_cost = models.IntegerField(default=0)
    influence_cost = models.IntegerField(default=0)

    # TODO maybe create level system

    profit_ratio_boost = models.IntegerField(blank=True)
    passive_income_boost = models.IntegerField(blank=True)

    def __str__(self) -> str:
        return f"Upgrade #{self.id} ({self.name_eng})"

    def is_purchased(self, profile):
        if str(self.id) in profile.upgrades:
            return True
        return False

    def verify_requirements(self, profile):
        if profile.money >= self.money_cost and profile.influence >= self.influence_cost:
            return True
        return False
    
    def purchase(self, profile):
        profile.money -= self.money_cost
        profile.influence -= self.influence_cost
        
        profile.upgrades[self.id] = {'status': 'purchased', 'time': str(datetime.now())}
        profile.profit_ratio += self.profit_ratio_boost
        profile.passive_income += self.passive_income_boost

        if self.passive_income_boost > 0 and profile.passive_income == 0:
            cache.set(f"{profile.id}_passive", int(datetime.now().timestamp()), timeout=None)

        profile.save()
    


    
