from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, default='Anonymous') # Anonymous is a key word for Django which means if no one passes in a name fill the feild with Anonymous this will be basis for our
    #regular user 
    email = models.EmailField(max_length=250, unique=True) #must be uniqe

    username = None # this field is default by changind it to None we are saying we dont want sign in to be done with username anymore
    USERNAME_FIELD = 'email'# but instead we want the login process to be governed by email in this case we can change this but what ever it is need to be uniqe and email makes more sense then anything else any way
    REQUIRED_FIELDS = []# this Is not needed but good to know might be usefull later maybe I want to add in some fields that are required
# Create your models here.
    phone = models.CharField(max_length=50, blank=True, null=True)
    gender= models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)


    session_token = models.CharField(max_length=10, default=0) # ****by default Django dosnt work with token based Auth so instead we need to set up our own custome Token 
    created_at = models.DateTimeField(auto_now_add=True) #auto now add is only for created at 
    updated_at = models.DateTimeField(auto_now=True)


    