from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from decimal import Decimal
from datetime import date, datetime

from .models import Order, OrderItem, ShippingAddress
from products.models import Product
from .serializers import CreateShippingAddressSerializer, CreateOrderSerializer, CreateOrderItemSerializer, GetShippingAddressSerializer, GetOrderSerializer, ListOrderSerializer

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_shipping_address(request):
    serializer = CreateShippingAddressSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shipping_addresses(request):
    shipping_addresses = ShippingAddress.objects.filter(user=request.user)
    serializer = GetShippingAddressSerializer(shipping_addresses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request, address_id):
    shipping_address = get_object_or_404(ShippingAddress, id=address_id)
    order_items = request.data["items"]

    if len(order_items) == 0:
        return Response({"items": ["No order items"]}, status=status.HTTP_400_BAD_REQUEST)

    order_serializer = CreateOrderSerializer(data=request.data["order"])

    if order_serializer.is_valid():
        order = order_serializer.save(
            shipping_address=shipping_address, user=request.user)

        for item in order_items:
            item_serializer = CreateOrderItemSerializer(data=item["data"])

            if item_serializer.is_valid():
                product = get_object_or_404(Product, id=item["product_id"])

                if Decimal(item["data"]["price"]) != product.regular_price or item["data"]["quantity"] > product.stock_count:
                    order.delete()
                    return Response({"price": ["You can not change the price or quantity of a product"]}, status=status.HTTP_400_BAD_REQUEST)

                item_serializer.save(product=product, order=order)
            else:
                return Response(item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"order_id": order.id}, status=status.HTTP_201_CREATED)
    else:
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = request.user.orders.all().order_by('-created_at')

    paginator = PageNumberPagination()
    paginator.page_size = 9
    orders = paginator.paginate_queryset(orders, request)

    serializer = ListOrderSerializer(orders, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request, id):
    order = get_object_or_404(Order, id=id)
    serializer = GetOrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, id):
    order = get_object_or_404(Order, id=id)

    order.is_paid = True
    order.paid_at = datetime.now()
    order.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, id):
    order = get_object_or_404(Order, id=id)

    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_orders(request):
    orders = Order.objects.all().order_by("-created_at")

    paginator = PageNumberPagination()
    paginator.page_size = 9
    orders = paginator.paginate_queryset(orders, request)

    serializer = ListOrderSerializer(orders, many=True)
    return paginator.get_paginated_response(serializer.data)
