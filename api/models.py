from django.db import models
from users.models import User


class Assignment(models.Model):
    title = models.CharField(max_length=50)
    company = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class GradeAssignment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.SET_NULL, blank=True, null=True)
    grade = models.FloatField()

    def __str__(self):
        return self.student.username
