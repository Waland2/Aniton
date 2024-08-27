from rest_framework import serializers

from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('text_eng', 'text_rus')