from rest_framework import serializers

from .models import Post
from users.models import User


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        post = Post()
        company = User.objects.get(username=data['company'])
        post.company = company
        post.title = data['title']

        post.save()

        return post
