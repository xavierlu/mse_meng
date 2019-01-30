from rest_framework import serializers

from .models import Assignment
from users.models import User


class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        assignment = Assignment()
        company = User.objects.get(username=data['company'])
        assignment.company = company
        assignment.title = data['title']

        assignment.save()

        return assignment
