import json
import logging

from django.contrib.auth.models import User
from django.db import connection
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

from .models import Todo
from .serializer import ToDoSerializer, UserSerializer
from .token_verify import verify_token

logger = logging.getLogger(__name__)

@api_view(['POST'])
def createUser(request):
  try:
    data = json.loads(request.body)

    userSerializer = UserSerializer(data=data)
    logger.warning(data)
    try:
      userSerializer.is_valid(raise_exception=True)
    except Exception as e :
      return Response(str(e))
    if(userSerializer.is_valid()):
      userSerializer.save()
      message = {"message": "successfully saved"}
      return Response(message, status=status.HTTP_200_OK)
  except Exception as e:
    message = {"message": "Error occured"}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)
  return Response("ok")
  
@api_view(['Get'])
def userLogin(request):
  user = json.loads(request.body)
  try:
    user = User.objects.get(password=user['password'], username=user['username'])
    serializer = UserSerializer(user, many=False)
    token = AccessToken.for_user(user)
    token['username'] = user.username
    logger.warning(token)
    token = {"message": str(token)}
    return Response(token, status=status.HTTP_200_OK)
  except Exception as e:
    message={"message": "Invalid UserName or password"}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['Post'])
def addToDo(request):
  if verify_token(request=request):
    data = json.loads(request.body)
    logger.warning(data)
    try:
      user = User.objects.get(username= data['username'])
    except Exception as e:
      return Response("User not found", status=status.HTTP_400_BAD_REQUEST)
    try:
      task = Todo(task=data['task'],user = user)
      logger.warning(task.task)
      task.save()
      serializer = ToDoSerializer(task, many=False)
      logger.warning(serializer.data)
    except Exception as e:
      return Response(str(e))
    message = {"message": serializer.data}
    return Response(message, status=status.HTTP_200_OK)
  message= {"message": "Invalid Token"}
  return Response(message)

@api_view(['Get'])
def getToDo(request, username):
  if verify_token(request=request):
    try:
      user = User.objects.get(username=username)
      task = Todo.objects.filter(user=user)
      logger.warning(task)
      if task:
        serializer = ToDoSerializer(task, many=True)
        message = {"message": serializer.data}
        return Response(message)
      message = {"message": "No Task Added"}
      return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
      message= {"message": "error occurred."}
      return Response(message, status=status.HTTP_400_BAD_REQUEST)
  message= {"message": "Invalid Token"}
  return Response(message)

@api_view(['Put'])
def completedTask(request, id):
  if verify_token(request=request):
    try:
      task = Todo.objects.get(pk=id)
      task.is_completed = True
      task.save()
      message = {"message": "Task completed"}
      return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
      message = {"message": "error occurred"}
      return Response(message, status=status.HTTP_400_BAD_REQUEST)
  message= {"message": "Invalid Token"}
  return Response(message)
  
@api_view(['Put'])
def updateTask(request, id):
  if verify_token(request=request):
    try:
      data = json.loads(request.body)
      task = Todo.objects.get(pk=id)
      task.task = data['task']
      task.save()
      message = {"message": "updated"}
      return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
      message = {"message": "error occurred"}
      return Response(message, status=status.HTTP_400_BAD_REQUEST)
  message= {"message": "Invalid Token"}
  return Response(message)

@api_view(['Delete'])
def deleteTask(request, id):
  if verify_token(request=request):
    try:
      task = Todo.objects.get(pk=id)
      task.delete()
      message = {'message': "Deleted successfully"}
      return Response(message, status=status.HTTP_200_OK)
    except Exception as e:
      message = {"message": str(e)}
      return Response(message, status=status.HTTP_400_BAD_REQUEST)
  message= {"message": "Invalid Token"}
  return Response(message)