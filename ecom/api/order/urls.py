from rest_framework import routers
from django.urls import path, include
from . import views # importing views.py from the current dir

router = routers.DefaultRouter()#this come from the documentation as simpleRouter but we dont want that for this particuler case we want default router instead
router.register(r'', views.OrderViewSet) # router import a empty path we do empty path because we already decleared the catagory path in the root url.py file 

urlpatterns = [
    path('add/<str:id>/<str:token>/', views.add, name='order.add'),
    path('', include(router.urls))
]