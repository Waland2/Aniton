from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Upgrade
from .serializers import UpgradeSerializer

class GetUpgrades(ListAPIView):
    queryset = Upgrade.objects.all()
    serializer_class = UpgradeSerializer


class PurchaseUpgrade(APIView):
    def post(self, request, upgrade_id):
        obj = Upgrade.objects.filter(id=upgrade_id)
        if not obj: 
            return Response({'error': 'No upgrade with this ID was found'}, 404)
        upgrade = obj[0]

        if upgrade.is_purchased(request.profile):
            return Response({'error': 'Upgrade already purchased'}, 400)

        if upgrade.verify_requirements(request.profile):
            upgrade.purchase(request.profile)
        else:
            return Response({'error': 'user does not meet the requirements'}, 400)
        
        return Response({'status': 'purchased'})