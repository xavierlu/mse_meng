from rest_framework.routers import DefaultRouter
from api.views import PostViewSet

router = DefaultRouter()
router.register(r'', PostViewSet, base_name='post')
urlpatterns = router.urls
