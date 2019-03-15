from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def create(self, request):
        serializer = PostSerializer(data=request.data)
        post = serializer.create(request)
        if post:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    # pk is the post's id
    def post(self, request, pk):
        serializer = PostSerializer(data=request.data)
        post = serializer.update(request, pk)
        if post:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
