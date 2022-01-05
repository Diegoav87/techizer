from django.contrib import admin
from .models import ShippingAddress, Order, OrderItem

# Register your models here.
admin.site.register(ShippingAddress)


class OrderItemInline(admin.TabularInline):
    model = OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [
        OrderItemInline,
    ]
