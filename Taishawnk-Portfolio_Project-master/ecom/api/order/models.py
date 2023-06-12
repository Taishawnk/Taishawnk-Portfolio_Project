from django.db import models
from api.user.models import CustomUser
from api.product.models import Product


class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True) #bringing in CustomUser

    product_names = models.CharField(max_length=500)# mutiple product names
    total_product= models.CharField(max_length=500, default=0)
    transaction_id = models.CharField(max_length=150, default=0)
    total_amount = models.CharField(max_length=50, default=0)

    created_at = models.DateTimeField(auto_now_add=True)#created at always add
    updated_at = models.DateTimeField(auto_now=True)#updated at just now



# Create your models here.
