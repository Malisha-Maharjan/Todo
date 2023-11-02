from django.urls import path

from .views import *

urlpatterns = [
    path('user/', createUser),
    path('get', userLogin),
    path('task', addToDo),
    path('get/todo/<str:username>', getToDo),
    path('complete/todo/<int:id>', completedTask),
    path('update/todo/<int:id>', updateTask),
]