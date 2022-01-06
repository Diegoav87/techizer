from django.urls import path
from . import views

app_name = "products"

urlpatterns = [
    path("latest/", views.get_latest_products),
    path("create/", views.create_product),
    path("edit/<slug:slug>/", views.edit_product),
    path("delete/<int:id>/", views.delete_product),
    path("categories/", views.get_categories),
    path("categories/<slug:slug>/", views.get_products_by_category),
    path("<slug:slug>/", views.get_product),
    path("reviews/<slug:slug>/", views.add_review),
    path("", views.products),
]
