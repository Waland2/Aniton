from django.db import models

from user.models import Profile
# Create your models here.
class Anime(models.Model):
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE)

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=30)
    number_of_series = models.IntegerField()

    rating = models.FloatField()
    money_profit = models.IntegerField()
    influence_profit = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.name} - {self.creator.username} ({self.rating})"
    
    
class Review(models.Model):
    min_rating = models.FloatField(default=0.1)
    max_rating = models.FloatField(default=10.0)

    text_eng = models.TextField()
    text_rus = models.TextField()

    def __str__(self) -> str:
        return f"{self.text_eng} {self.min_rating} - {self.max_rating}"
    
    class Meta:
       ordering = ["min_rating", "max_rating"]