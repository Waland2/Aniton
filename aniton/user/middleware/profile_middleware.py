import jwt
from user.models import User

class ProfileMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        if "Authorization" in request.headers:
            try:
                jwt_token = request.headers['Authorization'].split(" ")[1]
                user_id = jwt.decode(jwt_token, algorithm="HS256", options={"verify_signature": False})['user_id']

                user_obj = User.objects.get(id=user_id)
                request.profile = user_obj.profile
            except:
                pass

        response = self.get_response(request)
        return response


    
