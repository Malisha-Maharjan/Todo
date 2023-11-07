import json
import logging
from functools import wraps

import jwt
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from Todo.settings import SIMPLE_JWT

from .token.verify_token import verify_token

# from .views import create_user


logger = logging.getLogger(__name__)


def todo_permission(function, **kwargs):

    @wraps(function, **kwargs)
    def wrapper(request, **kwargs):
        logger.warning("this is a decorator")
        username = verify_token(request=request)
        if username:
            try:
                user = User.objects.get(username=username)
            except Exception as e:
                message = {"message": "User not found"}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
            logger.warning('Checking permission')
            if (not user.has_perm('backend.manage_todo')):
                message = {"message": "User has no permission"}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
            return function(request, **kwargs)
        message = {"message": "Invalid Token"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    return wrapper
