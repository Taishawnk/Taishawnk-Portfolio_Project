from rest_framework import  serializers
from .models import Category

class CategorySerializer(serializers.HyperlinkedModelSerializer): # doing this is in the documentation under serializer section under model serializer the hyperlinkmodleserializer is what we need for our 
    #catagory objects to actually show and not just return empty when we call the api the documentation for this step is very bad and confusing had to search this issue up on stack overflow
    class Meta:
        model = Category 
        fields = ('name', 'description')
        