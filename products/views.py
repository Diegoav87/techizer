from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import PageNumberPagination

from .serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer
from .models import Product, Category

# Create your views here.


@api_view(['GET'])
def get_products_by_category(request, slug):
    category = Category.objects.get(slug=slug)
    products = Product.objects.filter(category=category)
    serializer = ProductListSerializer(products, many=True)
    return Response({"category_name": category.name, "results": serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def products(request):
    products = Product.objects.filter(is_active=True).order_by("-created_at")
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_product(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)
