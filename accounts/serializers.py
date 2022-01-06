from django.contrib.auth.password_validation import validate_password
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_text

from rest_framework import serializers

from .models import CustomUser
from .tokens import account_activation_token


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'password2', "first_name")

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        if CustomUser.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError(
                {"username": "User with this username already exists."})

        if CustomUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "User with this email already exists."})

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop("password2", None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class AccountActivationSerializer(serializers.Serializer):
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        uidb64 = attrs.get("uidb64", "")
        token = attrs.get("token", "")

        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except:
            user = None

        if user.is_active == True:
            raise serializers.ValidationError(
                {"user": "This user is already active"})

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
        else:
            raise serializers.ValidationError(
                {"user": "The activation token is invalid"})
        return attrs


class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ("password", "password2", "token", "uidb64")

    def validate(self, attrs):
        password = attrs.get("password", "")
        password2 = attrs.get("password2", "")

        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match"})

        uidb64 = attrs.get("uidb64", "")
        token = attrs.get("token", "")

        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except:
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.set_password(password)
            user.save()
        else:
            raise serializers.ValidationError(
                {"user": "The reset token is invalid"})

        return attrs


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "first_name", "is_staff")


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "first_name")

    def validate_username(self, value):
        request = self.context.get("request", "")
        user = request.user

        if CustomUser.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError(
                "This username is already in use")
        return value


class AdminUserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "first_name", "is_staff")

    def validate_username(self, value):
        user = self.context.get("user", "")

        if CustomUser.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError(
                "This username is already in use")
        return value


class UpdatePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Password fields didn't match")

        return attrs

    def validate_old_password(self, value):
        request = self.context.get("request", "")

        if not request.user.check_password(value):
            raise serializers.ValidationError("Old password is not correct")
        return value

    def update(self, instance, validated_data):
        request = self.context.get("request", "")
        user = request.user

        if user.pk != instance.pk:
            raise serializers.ValidationError(
                "You dont have permission to edit this user's password")

        instance.set_password(validated_data['password'])
        instance.save()

        return instance
