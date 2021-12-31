from django.core.paginator import Page
from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import PageNumberPagination

from .serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer
from .models import Product, Category
from utils.pagination import CategoryPagination

# Create your views here.


@api_view(['GET'])
def get_products_by_category(request, slug):
    min_price = request.GET.get("min_price", "")
    max_price = request.GET.get("max_price", "")

    category = Category.objects.get(slug=slug)
    products = Product.objects.filter(
        category=category).order_by("-created_at")

    if min_price != "":
        products = products.filter(regular_price__gte=float(min_price))

    if max_price != "":
        products = products.filter(regular_price__lte=float(max_price))

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

    products = Product.objects.filter(
        is_active=True, title__icontains=query).order_by("-created_at")

    if min_price != "":
        products = products.filter(regular_price__gte=float(min_price))

    if max_price != "":
        products = products.filter(regular_price__lte=float(max_price))

    paginator = PageNumberPagination()
    paginator.page_size = 9
    products = paginator.paginate_queryset(products, request)

    serializer = ProductListSerializer(products, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def get_product(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)
