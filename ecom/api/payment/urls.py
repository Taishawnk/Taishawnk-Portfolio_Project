from django.urls import path, include
from . import views 


urlpatterns = [
path('gettoken/<str:id>/<str:token>/', views.generate_token, name="token.generate"),
path('transaction/<str:id>/<str:token>/', views.transaction, name="transaction.payment"),
]