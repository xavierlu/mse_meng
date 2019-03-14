from rest_framework import serializers

from .. import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "__all__"
        #exclude = ('password', 'last_login', 'is_superuser', 'is_staff', 'date_joined')

