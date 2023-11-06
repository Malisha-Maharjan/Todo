import json
import logging

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Todo
from .serializer import ToDoSerializer, UserSerializer
from .utils.token.generate_token import generate_token
from .utils.token.verify_token import verify_token

logger = logging.getLogger(__name__)


@api_view(['POST'])
def create_user(request):
    """create user api"""

    try:
        data = json.loads(request.body)
        logger.warning(data)
        user_serializer = UserSerializer(data=data)
        user = User.objects.filter(username=data['username'])

        if (len(user) != 0):
            message = {"message": "Username already exist", "data": []}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_serializer.is_valid(raise_exception=True)
        except Exception as e:
            message = {"message": "Invalid Field", "data": []}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if (user_serializer.is_valid()):
            user_serializer.save()
            user = User.objects.get(username=user_serializer.data['username'])
            message = {"message": "successfully saved",
                       "data": generate_token(user)}
            return Response(message, status=status.HTTP_200_OK)

    except Exception as e:
        message = {"message": "Error occured", "data": []}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['Post'])
def user_login(request):
    """user login api"""

    user = json.loads(request.body)

    try:
        user = User.objects.get(
            password=user['password'], username=user['username'])
        serializer = UserSerializer(user, many=False)
        token = {"message": "Login successful", "data": generate_token(user)}
        return Response(token, status=status.HTTP_200_OK)
    except Exception as e:
        message = {"message": "Invalid UserName or password", "data": []}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['Post'])
def add_task(request):
    """add new task api"""

    if verify_token(request=request):
        data = json.loads(request.body)

        try:
            user = User.objects.get(username=data['username'])
        except Exception as e:
            return Response("User not found", status=status.HTTP_400_BAD_REQUEST)

        try:
            task = Todo(task=data['task'], user=user)
            logger.warning(task.task)
            task.save()
            serializer = ToDoSerializer(task, many=False)
            logger.warning(serializer.data)
        except Exception as e:
            return Response(str(e))
        message = {"message": "Successful", "data": serializer.data}
        return Response(message, status=status.HTTP_200_OK)

    message = {"message": "Invalid Token"}
    return Response(message)


@api_view(['Get'])
def get_task(request, username):
    """get all the task api"""

    if verify_token(request=request):
        try:
            user = User.objects.get(username=username)
            task = Todo.objects.filter(user=user)

            if task:
                serializer = ToDoSerializer(task, many=True)
                message = {"message": "", "data": serializer.data}
                logger.warning(serializer.data)
                return Response(message)

            message = {"message": "No Task Added", "data": []}
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            message = {"message": "error occurred.", "data": []}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    message = {"message": "Invalid Token"}
    return Response(message)


@api_view(['Put'])
def toggle_task(request, task_id):
    """toggle the existing task api"""

    if verify_token(request=request):
        data = json.loads(request.body)

        try:
            task = Todo.objects.get(pk=task_id)
            task.is_completed = data['checked']
            task.save()
            message = {"message": "Task completed", "data": []}
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            message = {"message": "error occurred", "data": []}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    message = {"message": "Invalid Token", "data": []}
    return Response(message)


@api_view(['Put'])
def edit_task(request, task_id):
    """edit the existing task api"""

    if verify_token(request=request):
        try:
            data = json.loads(request.body)
            task = Todo.objects.get(pk=task_id)
            task.task = data['task']
            task.save()
            message = {"message": "updated"}
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            message = {"message": "error occurred"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    message = {"message": "Invalid Token"}
    return Response(message)


@api_view(['Delete'])
def delete_task(request, task_id):
    """delete the task api"""

    if verify_token(request=request):
        try:
            task = Todo.objects.get(pk=task_id)
            task.delete()
            message = {'message': "Deleted successfully"}
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            message = {"message": str(e)}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    message = {"message": "Invalid Token"}
    return Response(message)
