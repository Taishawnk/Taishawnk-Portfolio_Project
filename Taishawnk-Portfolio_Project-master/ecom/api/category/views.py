#from django.shortcuts import render dont need this pice that comes standerd with django projects if you are  utilizinig api structure instead of django deffaults below is what we do instead

from rest_framework import viewsets

from .serializers import CategorySerializer
from .models import Category


class CategoryViewsSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name') #what is the data we are bringing form database order_by is optional 
    serializer_class = CategorySerializer #coversion of the data to Jason.. We calll on our serializer class  

#add this url path for this in the api/url.py  aka the root url file 


                                                                                                           