from django.db import models

class User(models.Model):
    first_name = models.CharField("First Name", max_length=255)
    last_name = models.CharField("Last Name", max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.first_name