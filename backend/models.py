from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    task = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta():
        ordering = ("is_completed", "created_at")
        default_permissions = ()
        permissions = (("view_todo_list", "can view the todo list"),
                       ("manage_todo", "create, update, delete, or toggle the todo"))


# class ListItem(models.Model):
#     name = models.CharField(max_length=10)
