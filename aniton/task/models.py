from django.db import models
from datetime import datetime

class Task(models.Model):
    is_verif_necessary = models.BooleanField(default=True)
    type = models.CharField(max_length=30, choices=[("game", "Game"), ("meta", "Meta")])
    
    title_eng = models.TextField(blank=True)
    title_rus = models.TextField(blank=True)
    link = models.URLField(blank=True)

    image = models.ImageField(blank=True, upload_to="tasks/")

    money_required = models.IntegerField(default=0)
    influence_required = models.IntegerField(default=0)
    friends_required = models.IntegerField(default=0)
    daily_streak_required = models.IntegerField(default=0)

    money_reward = models.IntegerField()
    influence_reward = models.IntegerField()
    
    def __str__(self) -> str:
        return f"Task #{self.id} ({self.type})"
    
    def is_completed(self, profile):
        if str(self.id) in profile.tasks:
            return True
        return False
    
    def complete(self, profile):
        profile.money += self.money_reward
        profile.influence += self.influence_reward
        profile.tasks[self.id] = {'status': 'completed', 'time': str(datetime.now())}
        profile.save()

    def verify_requirements(self, profile):
        if profile.money >= self.money_required and profile.influence >= self.influence_required and profile.daily_streak >= self.daily_streak_required and profile.number_of_friends >= self.friends_required:
            return True
        return False