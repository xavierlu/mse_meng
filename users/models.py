from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_student = models.BooleanField()
    is_company = models.BooleanField()
    phoneNumber = models.CharField(max_length=11, default='')
    name = models.CharField(max_length=20, default='')

    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
