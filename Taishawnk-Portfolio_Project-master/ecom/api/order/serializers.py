from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ( 'user', 'product_names', 'total_products','transaction_id', 'total_amount ')#feilds is what ever we want returned back to the user dashbord




