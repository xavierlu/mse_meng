from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from . import serializers
from .. import models


# https://www.django-rest-framework.org/api-guide/viewsets/

class UserViewSet(viewsets.ModelViewSet):

    def create(self, request):
        serializer = serializers.UserSerializer(data=request.data)

        g = request.POST.get
        user = models.User(username=g('username'), email=g('email'), is_company=bool(g('is_company')),
                           picture=g('picture'), bio=g('bio'), first_name=g('first_name'), last_name=g('first_name'))
        print(g)
        user.set_password(g('password'))

        if serializer.is_valid():
            try:
                user.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    # need to add update user methods here too later
