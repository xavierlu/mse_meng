from django.urls import path

from rest_framework.authtoken import views as rfauth_views
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'user', views.UserViewSet, basename='user')

urlpatterns = [
    path('api-token-auth/', rfauth_views.obtain_auth_token)
]

urlpatterns += router.urls