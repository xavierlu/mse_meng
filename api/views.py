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
        data = request.data
        post = Post.objects.all().get(id=pk)

        post.company = data['company']
        post.title = data['title']
        post.abstract = data['abstract']
        post.description = data['description']
        post.studentNeeded = data['studentNeeded']
        post.requirements = data['requirements']
        post.email = data['email']
        post.phoneNumber = data['phoneNumber']

        post.save()
        return Response(status=HTTP_201_CREATED)
