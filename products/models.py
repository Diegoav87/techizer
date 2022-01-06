from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.db.models.signals import pre_save, post_save

from accounts.models import CustomUser
from .utils import slugify_instance_title

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
    slug = models.SlugField(max_length=255, unique=True, blank=True)
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
    stock_count = models.IntegerField(default=0, blank=True)
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


class Review(models.Model):
    user = models.ForeignKey(
        CustomUser, related_name="reviews", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name="reviews", on_delete=models.CASCADE)
    text = models.TextField(max_length=500)
    rating = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"By {self.user.username} for {self.product.title}: {self.rating}"


def product_pre_save(sender, instance, *args, **kwargs):
    # print('pre_save')
    if instance.slug is None:
        slugify_instance_title(instance, save=False)


pre_save.connect(product_pre_save, sender=Product)


def product_post_save(sender, instance, created, *args, **kwargs):
    # print('post_save')
    if created:
        slugify_instance_title(instance, save=True)


post_save.connect(product_post_save, sender=Product)
