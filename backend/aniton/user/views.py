
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.core.cache import cache

import time
import json

from . import utils
from .serializers import ProfileSerializer


class UserAuth(APIView): 
    permission_classes = [AllowAny]
    def get(self, request):

        if request.user.is_authenticated: return Response({"access": str(RefreshToken.for_user(request.user).access_token), "is_new": False}, 200)  
            
        try:
            if not utils.is_valid(request.query_params):
                return Response({"error": "The data is not from Telegram"}, 400)
        except:
            return Response({"error": "Invalid request"}, 400)

        if int(time.time()) - int(request.query_params['auth_date']) >= 172800: # token valid for 48 hours
            return Response({"error": "Timeout"}, 400)

        user_data = json.loads(request.query_params['user'])

        if not User.objects.filter(username=user_data['id']).exists():
            user = User.objects.create_user(username=str(user_data['id']))
            user.profile.username = user_data['username']
            user.profile.language = 'en' #'user_data['language_code']' # TODO
            user.profile.referral_code = utils.generate_ref_code(user_data['id'])
            user.save()

        user = User.objects.get(username=str(user_data['id']))
        
        refresh = RefreshToken.for_user(user)

        return Response({'access': str(refresh.access_token), "is_new": not user.profile.is_learning_complete}, 200)

class SetStudioName(APIView):
    def post(self, request):
        if request.profile.is_learning_complete: 
            return Response({'error': 'Learning already complete'}, 400)
        
        request.profile.studio_name = request.data['name']
        request.profile.is_learning_complete = True
        request.profile.save()
        
        return Response({"status": "success"})


class SetWallet(APIView):
    def post(self, request):
        request.profile.ton_wallet = request.data['wallet']
        request.profile.save()
        return Response({'status': 'ok'})

class UserStats(APIView):
    def get(self, request):
        profile_data = ProfileSerializer(request.profile).data

        
        anime_creating_timeout = cache.ttl(f"{request.profile.id}_anime_timeout")
        additional_data = {
            'timeout_seconds': anime_creating_timeout
        }
        response_data = {**profile_data, **additional_data}
        
        return Response(response_data)