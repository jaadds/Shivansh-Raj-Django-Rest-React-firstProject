from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser,User
from django.conf import settings 

class post(models.Model):
    user_name=models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    time=models.DateTimeField(auto_now=True)
    title=models.CharField(max_length=100,null=True)
    content=models.TextField(max_length=1500,null=True,blank=True)

    def __str__(self):
        return self.title
    