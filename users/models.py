from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_student = models.BooleanField()
    is_company = models.BooleanField()
    undergrads_university = models.CharField(max_length=100, default='')
    undergrads_major = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
