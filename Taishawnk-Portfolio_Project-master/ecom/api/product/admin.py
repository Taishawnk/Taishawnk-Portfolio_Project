from django.contrib import admin
from .models import Product
# Register your models here.
admin.site.register(Product)#after we register we have to add to setting.py under installed apps