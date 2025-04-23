from rest_framework import serializers

from .models import Upgrade

class UpgradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upgrade
        fields = '__all__'