from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Post(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now=True)
    description = models.TextField(default='', null=True)
    requirements = models.TextField(default='', null=True)

    email = models.EmailField(default='', null=True)
    phone_number = models.CharField(max_length=11, default='', null=True)
    website = models.URLField(default='', max_length=750, null=True)
    file = models.FileField(null=True)
    tags = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.title


