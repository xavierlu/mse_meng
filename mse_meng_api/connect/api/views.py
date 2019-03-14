from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .. import models


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = (IsAuthenticated,)


