from django.db import models
from users.models import User


class Post(models.Model):
    title = models.CharField(max_length=50)
    company = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
