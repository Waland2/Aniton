from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from user.models import Profile

class Friend(models.Model):
    referral_id = models.BigIntegerField()
    referral_of = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.referral_of.username} -> {self.referral_id}"


@receiver(post_delete, sender=Friend)
def save_user_profile(sender, instance, **kwargs):
    instance.referral_of.number_of_friends -= 1
    instance.referral_of.save()