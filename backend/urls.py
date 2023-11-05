from django.urls import path

from .views import *

urlpatterns = [
    path('register', createUser),
    path('login', userLogin),
    path('todo/add', addToDo),
    path('todo/get/<str:username>', getToDo),
    path('todo/toggle/<int:id>', toggleTask),
    path('todo/update/<int:id>', updateTask),
    path('todo/delete/<int:id>', deleteTask),
]