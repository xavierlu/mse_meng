from django.db import models
from users.models import User


class Post(models.Model):
    title = models.CharField(max_length=50)
    abstract = models.CharField(max_length=255, default='')
    description = models.TextField(default='')
    email = models.EmailField(default='')
    phoneNumber = models.CharField(max_length=11, default='')
    company = models.CharField(max_length=50)
    relevent_file = models.FileField(default=False)

    def __str__(self):
        return self.title
