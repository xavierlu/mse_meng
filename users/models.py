from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_student = models.BooleanField(blank=True)
    is_company = models.BooleanField(blank=True)
    undergrads_university = models.CharField(max_length=100, default='', blank=True)
    undergrads_major = models.CharField(max_length=100, default='', blank=True)

    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
