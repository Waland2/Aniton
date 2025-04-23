import json
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from datetime import datetime
import json

from aniton.config import * 

class Profile(models.Model):
    id = models.BigIntegerField(primary_key=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    username = models.CharField(max_length=40, blank=True)
    language = models.CharField(max_length=2, blank=True)
    money = models.BigIntegerField(default=0)
    influence = models.BigIntegerField(default=0) 

    studio_name = models.CharField(max_length=100, blank=True)
    is_learning_complete = models.BooleanField(default=False)    

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    daily_streak = models.IntegerField(default=1)
    last_daily_collect = models.DateTimeField(default=datetime.now)
    tasks = models.JSONField(default=dict, blank=True)

    number_of_friends = models.IntegerField(default=0)
    referral_code = models.CharField(max_length=25)

    upgrades = models.JSONField(default=dict, blank=True)
    profit_ratio = models.IntegerField(default=150)
    passive_income = models.IntegerField(default=0)
    timeout_after_creating = models.IntegerField(default=TIMEOUT_AFTER_CREATING)

    ton_wallet = models.CharField(max_length=60, blank=True)

  
    def __str__(self) -> str:
        return f"{self.id} ({self.username})"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.username.isnumeric():
        new_profile = Profile.objects.create(user=instance, id=int(instance.username))

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.username.isnumeric():
        instance.profile.save()