from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

import datetime as dt

from aniton.config import DAILY_REWARDS
from .serializers import TaskSerializer
from .models import Task

class DailyTaskCollect(APIView):
    def post(self, request):

        profile = request.profile

        last_time = profile.last_daily_collect
        now_time = dt.datetime.now()

        if last_time.date() == now_time.date():
            return Response({"is_claimed_today": True})    
        
        now_time -= dt.timedelta(1)
        is_streak_saved = True

        old_streak = profile.daily_streak
        new_streak = old_streak + 1
        if last_time.date() != now_time.date():
            is_streak_saved, new_streak = False, 1
         
        max_day = max(DAILY_REWARDS.keys())

        if new_streak > max_day: money_reward, influence_reward = DAILY_REWARDS[max_day]
        else: money_reward, influence_reward = DAILY_REWARDS[new_streak]

        profile.money += money_reward 
        profile.influence += influence_reward
        profile.daily_streak = new_streak
        # profile.last_daily_collect = dt.datetime.now() TODO fix test change
        profile.save()


        return Response({
                    "is_claimed_today": False,
                    "is_streak_saved": is_streak_saved, 
                    "old_streak": old_streak,
                    "new_streak": new_streak, 
                    "money_reward": money_reward,
                    "influence_reward": influence_reward,
            })    


class GetTasksList(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CompleteTask(APIView):
    def post(self, request, task_id):
        obj = Task.objects.filter(id=task_id)
        if not obj:
            return Response({'error': 'No task with this ID was found'}, 404)
        task = obj[0]

        if task.is_completed(request.profile): 
            return Response({'error': 'Task already completed'}, 400)

        if not task.is_verif_necessary:
            return 

        if task.verify_requirements(request.profile):
            task.complete(request.profile)
        else:
            return Response({'error': 'user does not meet the requirements'}, 400)
        
        return Response({'status': 'completed', 'money_reward': task.money_reward, 'influence_reward': task.influence_reward})
    
class SubscribeCheck(APIView):
    def post(self, request):
        profile = request.profile

        # TODO subscribe check (how idk)
        check_result = True

        if not check_result: return Response({'error': 'user doesnt subscribe on channel'}, 400)

        task = Task.objects.get(id=4)
        
        task.complete(profile)

        return Response({'status': 'success'})