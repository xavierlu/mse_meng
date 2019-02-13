from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_company', 'undergrads_university', 'undergrads_major')


class CustomRegisterSerializer(RegisterSerializer):
    is_student = serializers.BooleanField()
    is_company = serializers.BooleanField()

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_company', 'undergrads_university', 'undergrads_major')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_company': self.validated_data.get('is_company', ''),
            'undergrads_university': self.validated_data.get('undergrads_university', ''),
            'undergrads_major': self.validated_data.get('undergrads_major', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = self.cleaned_data.get('is_student')
        user.is_company = self.cleaned_data.get('is_company')
        user.undergrads_university = self.cleaned_data.get('undergrads_university')
        user.undergrads_major = self.cleaned_data.get('undergrads_major')
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
