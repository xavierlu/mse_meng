from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'post', views.PostViewSet, basename='post')
urlpatterns = router.urls
