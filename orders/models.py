from django.db import models
from accounts.models import CustomUser
from products.models import Product

# Create your models here.


class ShippingAddress(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="shipping_addresses")
    full_name = models.CharField(max_length=255)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.address)


class Order(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, related_name="orders", null=True)
    shipping_address = models.ForeignKey(
        ShippingAddress, on_delete=models.SET_NULL, related_name="orders", null=True)
    shipping_cost = models.DecimalField(
        max_digits=7, decimal_places=2, default=9.99)
    payment_method = models.CharField(max_length=255, null=True)
    sub_total = models.DecimalField(max_digits=7, decimal_places=2, null=True)
    total_paid = models.DecimalField(max_digits=7, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}: {str(self.created_at)}"


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, related_name="order_items", null=True)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"{self.product.title}: {self.quantity}"
