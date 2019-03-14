from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):

    is_company = models.BooleanField(default=False)
    picture = models.ImageField(null=True)
    bio = models.TextField(null=True)
