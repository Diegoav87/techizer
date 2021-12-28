from django.contrib import admin

# Register your models here.
from .models import Product, Category, ProductImage

admin.site.register(Category)


class ProductImageInline(admin.TabularInline):
    model = ProductImage


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductImageInline,
    ]
