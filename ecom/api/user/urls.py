from rest_framework import routers 
from django.urls import path, include
from  . import views


router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path('login/', views.signin, name= "signin"),# this is added in only for use because we have some paths that are needed that are not part of the defauly set in our case sign in and sign out wich we 
    #call from the vies section 
    path("logout/<int:id>/", views.signout, name='signout'), #how we target the logout by id as we sign out by id  in our users.view 
    path('', include(router.urls))#empty '' because its already deffined in the api url.py file
]



#Note we need to delete the standerd sql3db that come standerd with our build because after setting thing up in this mannner there will be issues that happen witht he stock db instance so just 
#delete it and we will regenerate it 