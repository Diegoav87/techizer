from django.urls import path
from . import views

app_name = "products"

urlpatterns = [
    path("categories/", views.get_categories),
    path("categories/<slug:slug>/", views.get_products_by_category),
    path("<slug:slug>/", views.get_product),
    path("", views.products),
]
