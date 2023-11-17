import datetime
import json
import logging
from datetime import date

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Todo
from .serializer import ToDoSerializer, UserSerializer
from .utils.todo_permission import todo_permission
from .utils.token.generate_token import generate_token
from .utils.token.verify_token import verify_token

logger = logging.getLogger(__name__)


@api_view(['POST'])
def create_user(request):
    """create user api"""

    try:
        logger.warning("create_user")
        data = json.loads(request.body)
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

    data = json.loads(request.body)
    try:
        user = User.objects.get(
            password=data['password'], username=data['username'])
        serializer = UserSerializer(user, many=False)
        token = {"message": "Login successful", "data": generate_token(
            user), "username": data['username']}
        return Response(token, status=status.HTTP_200_OK)
    except Exception as e:
        logger.warning(e)
        message = {"message": "Invalid UserName or password", "data": []}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['Post'])
@todo_permission
def add_task(request):
    """add new task api"""
    username = verify_token(request=request)
    if username:
        data = json.loads(request.body)
        date1 = datetime.datetime.strptime(
            data['date'], "%Y-%m-%dT%H:%M:%S.%f%z")

        data['date'] = datetime.datetime.strftime(date1, '%Y-%m-%d')
        logger.warning(data)
        try:
            user = User.objects.get(username=username)
        except Exception as e:
            return Response("User not found", status=status.HTTP_400_BAD_REQUEST)

        logger.warning('Checking permission')
        logger.warning(user.has_perm('backend.manage_todo'))

        try:
            todo = Todo.objects.filter(user=user).last()
            # logger.warning(todos)
            if (todo is not None):
                task = Todo(
                    task=data['task'], description=data['description'], user=user, schedule_at=data['date'], index=todo.index+1)
            else:
                task = Todo(
                    task=data['task'], description=data['description'], user=user, schedule_at=data['date'], index=0)
            logger.warning(task.task)
            task.save()
            serializer = ToDoSerializer(task, many=False)
            logger.warning(serializer.data)
        except Exception as e:
            logger.warning(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        message = {"message": "Successful", "data": serializer.data}
        return Response(message, status=status.HTTP_200_OK)

    message = {"message": "Invalid Token"}
    return Response(message)


@api_view(['Get'])
# @todo_permission
def get_task(request):
    """get all the task api"""
    logger.warning("getting todo")
    username = verify_token(request=request)
    if username:
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


@api_view(['Get'])
# @todo_permission
def get_task_today(request):
    """get all the today task api"""
    logger.warning("getting todo")
    username = verify_token(request=request)
    if username:
        try:
            user = User.objects.get(username=username)
            logger.warning(date.today())
            task = Todo.objects.filter(user=user, schedule_at=date.today())

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
@todo_permission
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
@todo_permission
def edit_task(request, task_id):
    """edit the existing task api"""

    if verify_token(request=request):
        try:
            data = json.loads(request.body)
            logger.warning(data)
            task = Todo.objects.get(pk=task_id)

            task.task = data['task']
            task.description = data['description']
            task.schedule_at = data['schedule_at']
            task.save()
            message = {"message": "updated"}
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            message = {"message": "error occurred"}
            logger.warning(e)
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    message = {"message": "Invalid Token"}
    return Response(message)


@api_view(['Delete'])
@todo_permission
def delete_task(request, task_id):
    """delete the task api"""

    if verify_token(request=request):
        try:
            task = Todo.objects.get(pk=task_id)
            task.delete()
            message = {'message': "Deleted successfully"}
            todos = Todo.objects.all()
            logger.warning(todos)
            if (todos):
                index = 0
                for todo in todos:
                    serializer = ToDoSerializer(todo, many=False)
                    t = Todo.objects.get(pk=serializer.data['id'])
                    t.index = index
                    index += 1
                    t.save()
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(e)
            message = {"message": str(e)}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    message = {"message": "Invalid Token"}
    return Response(message)


@api_view(['POST'])
@todo_permission
def drag_and_drop(request):
    if verify_token(request=request):
        data = json.loads(request.body)
        logger.warning(data['data'])
        index = 0
        for task in data['data']:
            todo = Todo.objects.get(pk=task['id'])
            todo.index = index
            index += 1
            todo.save()
        return Response("ok")
    message = {"message": "Invalid Token"}
    return Response(message)

# 0 -> 2, 0 -> 4
# 1 -> 3, 1 -> 2
# 2 -> 4, 2 -> 3


# [4, 2, 3]
