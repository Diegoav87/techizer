from django.core.paginator import Page
from django.shortcuts import render, get_object_or_404
from django.db.models import Avg

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import PageNumberPagination

from .serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer, ReviewCreateSerializer, CreateProductSerializer
from .models import Product, Category, Review, ProductImage
from utils.pagination import CategoryPagination
from .utils import sort_queryset

# Create your views here.


@api_view(['GET'])
def get_products_by_category(request, slug):
    min_price = request.GET.get("min_price", "")
    max_price = request.GET.get("max_price", "")
    ratings = request.GET.getlist("rating[]")

    category = Category.objects.get(slug=slug)
    products = Product.objects.annotate(average_rating=Avg("reviews__rating")).filter(
        category=category).order_by("-created_at")

    if min_price != "":
        products = products.filter(regular_price__gte=float(min_price))

    if max_price != "":
        products = products.filter(regular_price__lte=float(max_price))

    if len(ratings) > 0:
        int_ratings = []

        for rating in ratings:
            int_ratings.append(int(rating))

        products = products.filter(average_rating__in=int_ratings)

    paginator = CategoryPagination()
    paginator.page_size = 9
    products = paginator.paginate_queryset(products, request)

    serializer = ProductListSerializer(products, many=True)
    return paginator.get_paginated_response(serializer.data, category.name)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def products(request):
    min_price = request.GET.get("min_price", "")
    max_price = request.GET.get("max_price", "")
    query = request.GET.get("keyword", "")
    ratings = request.GET.getlist("rating[]")
    sort = request.GET.get("sort", "")

    products = Product.objects.annotate(average_rating=Avg("reviews__rating")).filter(
        is_active=True, title__icontains=query).order_by("-created_at")

    if min_price != "":
        products = products.filter(regular_price__gte=float(min_price))

    if max_price != "":
        products = products.filter(regular_price__lte=float(max_price))

    if len(ratings) > 0:
        int_ratings = []

        for rating in ratings:
            int_ratings.append(int(rating))

        products = products.filter(average_rating__in=int_ratings)

    products = sort_queryset(products, sort)

    paginator = PageNumberPagination()
    paginator.page_size = 9
    products = paginator.paginate_queryset(products, request)

    serializer = ProductListSerializer(products, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def get_latest_products(request):
    products = Product.objects.annotate(average_rating=Avg("reviews__rating")).filter(
        average_rating__gte=4).order_by('-created_at')[:6]
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_product(request, slug):
    product = get_object_or_404(Product.objects.annotate(
        average_rating=Avg("reviews__rating")), slug=slug)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_review(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ReviewCreateSerializer(data=request.data)

    if product.reviews.filter(user=request.user).exists():
        return Response({"review": ["Product already reviewed"]}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        serializer.save(user=request.user, product=product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    serializer = CreateProductSerializer(data=request.data)

    if serializer.is_valid():
        product = serializer.save()
        return Response({"id": product.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_product(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = CreateProductSerializer(
        instance=product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, id):
    product = get_object_or_404(Product, id=id)
    product.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser])
def product_image_upload(request, id):
    product = get_object_or_404(Product, id=id)
    image = request.data.get("image", "")
    is_feature = request.data.get("is_feature", "")

    if is_feature == "true":
        is_feature = True
    elif is_feature == "false":
        is_feature = False

    product_image = ProductImage.objects.create(
        image=image, is_feature=is_feature, product=product)
    return Response(status=status.HTTP_200_OK)
