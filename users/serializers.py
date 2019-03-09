from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_company')


class CustomRegisterSerializer(RegisterSerializer):
    is_student = serializers.BooleanField()
    is_company = serializers.BooleanField()
    undergrads_university = serializers.CharField()
    undergrads_major = serializers.CharField()

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_company')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_company': self.validated_data.get('is_company', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = self.cleaned_data.get('is_student')
        user.is_company = self.cleaned_data.get('is_company')
        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_student = serializer_data.get('is_student')
        is_company = serializer_data.get('is_company')
        return {
            'is_student': is_student,
            'is_company': is_company
        }
