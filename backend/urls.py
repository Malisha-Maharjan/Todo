from django.urls import path

from .views import *

urlpatterns = [
    path('register', create_user),
    path('login', user_login),
    path('todo/add', add_task),
    path('todo/get/<str:username>', get_task),
    path('todo/toggle/<int:id>', toggle_task),
    path('todo/edit/<int:id>', edit_task),
    path('todo/delete/<int:id>', delete_task),
]