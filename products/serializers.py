from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductImage, Review
from accounts.serializers import GetUserSerializer


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("text", "rating")

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "The rating has to be a number between 1 and 5")
        return value


class ReviewGetSerializer(serializers.ModelSerializer):
    user = GetUserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ("user", "text", "rating", "created_at", "updated_at")


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
    reviews = ReviewGetSerializer(read_only=True, many=True)
    product_images = ProductImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ("title", "description", "slug", "regular_price",
                  "category", "stock_count", "weight", "product_images", "id", "get_featured_image", "reviews")
