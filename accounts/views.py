from django.shortcuts import get_object_or_404, render
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination


from .serializers import CustomUserSerializer, GetUserSerializer, UserEditSerializer, UpdatePasswordSerializer, AccountActivationSerializer, PasswordResetSerializer, AdminUserEditSerializer
from accounts.models import CustomUser
from .utils import Util
from .tokens import account_activation_token


# Create your views here.
@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save(is_active=False)

        subject = 'Activate your account.'
        message = render_to_string('account_activation_email.html', {
            'user': user,
            'domain': settings.DOMAIN,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
        })
        user.email_user(subject=subject, message=message)
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def account_activate(request):
    serializer = AccountActivationSerializer(data=request.data)

    if serializer.is_valid():
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def request_password_reset(request):
    email = request.data.get("email", "")

    if CustomUser.objects.filter(email=email).exists():
        user = CustomUser.objects.get(email=email)

        subject = 'Reset your password'
        message = render_to_string('password_reset.html', {
            'user': user,
            'domain': settings.DOMAIN,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
        })
        user.email_user(subject=subject, message=message)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response({"user": ["This email is not associated to a user"]}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def password_reset(request):
    serializer = PasswordResetSerializer(data=request.data)

    if serializer.is_valid():
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = GetUserSerializer(user)
    return Response({"user": serializer.data})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user_by_id(request, id):
    user = get_object_or_404(CustomUser, id=id)
    serializer = GetUserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = CustomUser.objects.all()

    paginator = PageNumberPagination()
    paginator.page_size = 9
    users = paginator.paginate_queryset(users, request)

    serializer = GetUserSerializer(users, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_user(request):
    serializer = UserEditSerializer(
        instance=request.user, data=request.data, partial=True, context={"request": request})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def admin_user_edit(request, id):
    user = get_object_or_404(CustomUser, id=id)
    serializer = AdminUserEditSerializer(
        instance=user, data=request.data, partial=True, context={"user": user})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, id):
    user = get_object_or_404(CustomUser, id=id)
    user.delete()
    return Response(status=status.HTTP_200_OK)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = UpdatePasswordSerializer
