#this we created for our url routes inside of our api app
from django.urls import path, include # need to import path and include 
#from rest_framework.authtoken import  views
from .views import home #bring in home from our view


urlpatterns = [
    path('', home, name='api.home')  ,
    path('category/', include('api.category.urls')),  #calls on the catagory/url.py to help us sort out the path 
    path("product/",  include("api.product.urls")),            
    # this is not the home route for the our project as a whole but for the api app    be declare home iside of or view for api as a function
    #nameing is optional but is best practice
    path("user/", include("api.user.urls")),
    path("order/", include("api.order.urls")) ,
    path('payment/', include("api.payment.urls")) 
]