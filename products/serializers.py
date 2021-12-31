from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "slug")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("image", "alt_text", "is_feature")


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("title", "description", "slug",
                  "regular_price", "category", "id", "get_featured_image")


class ProductDetailSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ("title", "description", "slug", "regular_price",
                  "category", "stock_count", "weight", "product_images", "id", "get_featured_image")
