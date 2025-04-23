from rest_framework.views import APIView
from rest_framework.response import Response

from user.models import Profile
from .models import Friend
from . import utils

class NewFriend(APIView):
    def post(self, request):
        
        if not utils.is_valid(request.data):
            return Response({'error': 'the provided data is not valid'}, 400)
        
        if len(Friend.objects.filter(referral_id=request.data['referralId'])):
            return Response({'error': 'user already referral'}, 400)


        referral_code_owner = Profile.objects.get(referral_code=request.data['referralCode'])

        Friend.objects.create(referral_id=request.data['referralId'], referral_of=referral_code_owner)
        referral_code_owner.number_of_friends += 1
        referral_code_owner.save()
        
        return Response({'status': 'ok'})
        