from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
