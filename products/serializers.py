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
    average_rating = serializers.IntegerField()

    class Meta:
        model = Product
        fields = ("title", "description", "slug",
                  "regular_price", "category", "id", "get_featured_image", "average_rating", "created_at")


class ProductDetailSerializer(serializers.ModelSerializer):
    reviews = ReviewGetSerializer(read_only=True, many=True)
    product_images = ProductImageSerializer(read_only=True, many=True)
    average_rating = serializers.IntegerField()
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("title", "description", "slug", "regular_price",
                  "category", "stock_count", "weight", "product_images", "id", "get_featured_image", "reviews", "average_rating", "discount_price")


class GetProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("title", "regular_price", "slug", "get_featured_image")


class CreateProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField()

    class Meta:
        model = Product
        fields = ("category", "title", "description", "regular_price",
                  "discount_price", "weight", "stock_count")

    def validate_category(self, value):
        if not Category.objects.filter(name=value).exists():
            raise serializers.ValidationError(
                "Category does not exist")
        return value

    def create(self, validated_data):
        category = validated_data.pop("category")
        category_object = Category.objects.get(name=category)
        instance = Product.objects.create(
            **validated_data, category=category_object)
        return instance

    def update(self, instance, validated_data):
        category = validated_data.get("category", instance.category)
        category_object = Category.objects.get(name=category)

        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get(
            "description", instance.description)
        instance.regular_price = validated_data.get(
            "regular_price", instance.regular_price)
        instance.discount_price = validated_data.get(
            "discount_price", instance.discount_price)
        instance.weight = validated_data.get("weight", instance.weight)
        instance.stock_count = validated_data.get(
            "stock_count", instance.stock_count)
        instance.category = category_object
        instance.save()
        return instance
