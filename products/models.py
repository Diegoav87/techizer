from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

from accounts.models import CustomUser

# Create your models here.


class Category(models.Model):
    name = models.CharField(
        verbose_name=_("Category Name"),
        max_length=255,
        unique=True,
    )
    slug = models.SlugField(verbose_name=_(
        "Category safe URL"), max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    title = models.CharField(
        verbose_name=_("title"),
        max_length=255,
    )
    description = models.TextField(
        verbose_name=_("description"), max_length=1000)
    slug = models.SlugField(max_length=255, unique=True)
    regular_price = models.DecimalField(
        verbose_name=_("Regular price"),
        max_digits=5,
        decimal_places=2,
    )
    discount_price = models.DecimalField(
        verbose_name=_("Discount price"),
        max_digits=5,
        decimal_places=2,
    )
    weight = models.FloatField(verbose_name=_("product weight"))
    in_stock = models.BooleanField(default=True)
    is_active = models.BooleanField(
        verbose_name=_("Product visibility"),
        default=True,
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)
    users_wishlist = models.ManyToManyField(
        CustomUser, related_name="user_wishlist", blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def get_featured_image(self):
        image = self.product_images.filter(is_feature=True).first()
        return {"image": image.image.url, "alt_text": image.alt_text}

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_images")
    image = models.ImageField(
        verbose_name=_("image"),
        upload_to="images/",
        default="images/default.png",
    )
    alt_text = models.CharField(
        verbose_name=_("Alternative text"),
        max_length=255,
        null=True,
        blank=True,
    )
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Product Image")
        verbose_name_plural = _("Product Images")
