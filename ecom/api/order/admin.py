from django.contrib import admin
#these will not show up in the admin portal if you do no set this up
from .models import Order
# Register your models here.


admin.site.register(Order)    
