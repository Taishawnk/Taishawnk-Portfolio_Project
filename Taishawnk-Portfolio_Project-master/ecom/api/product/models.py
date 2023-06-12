from django.db import models
from api.category.models import Category #because im inheriting from Category we need bring in Category as a forgien key



class Product(models.Model):
    
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    price = models.CharField(max_length=50)
    stock = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True, blank=True) # Blank = True means that feild can be empty
    image =  models.ImageField(upload_to='images/', blank=True, null=True)# we already told our system where to store images/ files in in the settings.py file under the Media_URL normally imagees would be handled by a diffrent file but beacause I am utilizing react on the front end we bring
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True) #calls to Forgine Key we already broght in Catagory so we can just pass it in  we set to null on delete so it wipe any data
    #and reffrence to the api data in shorter terms we dont want left-over data floating around
    created_at = models.DateTimeField(auto_now_add=True)#created at always add
    updated_at = models.DateTimeField(auto_now=True)#updated at just now


    def __str__(self):
        return self.name 
