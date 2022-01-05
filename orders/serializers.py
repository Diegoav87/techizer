from rest_framework import serializers
from .models import ShippingAddress, Order, OrderItem
from products.serializers import GetProductSerializer


class CreateShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ("full_name", "address", "city", "postal_code", "country")


class GetShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ("full_name", "address", "city", "postal_code",
                  "country", "created_at", "updated_at", "id")


class CreateOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("price", "quantity")


class GetOrderItemSerializer(serializers.ModelSerializer):
    product = GetProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ("product", "price", "quantity")


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("total_paid", "sub_total", "payment_method")


class ListOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("total_paid", "is_paid", "is_delivered", "created_at", "id")


class GetOrderSerializer(serializers.ModelSerializer):
    shipping_address = GetShippingAddressSerializer(read_only=True)
    order_items = GetOrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ("shipping_address", "total_paid", "is_paid", "paid_at",
                  "is_delivered", "delivered_at", "created_at", "updated_at", "order_items", "sub_total", "payment_method", "shipping_cost", "id")
