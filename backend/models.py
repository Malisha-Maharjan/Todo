from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    task = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    index = models.IntegerField(null=False)
    description = models.CharField(max_length=1000, default=None)
    schedule_at = models.DateField(default=None)

    class Meta():
        ordering = ["index"]
        default_permissions = ()
        permissions = (("view_todo_list", "can view the todo list"),
                       ("manage_todo", "create, update, delete, or toggle the todo"))


# class ListItem(models.Model):
#     name = models.CharField(max_length=10)
