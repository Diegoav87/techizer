from django.urls import path
from . import views

app_name = "orders"

urlpatterns = [
    path("shipping_address/create/", views.add_shipping_address),
    path("shipping_address/", views.get_shipping_addresses),
    path("create/<int:address_id>/", views.create_order),
    path("user/", views.get_user_orders),
    path("<int:id>/", views.get_order),
    path("pay/<int:id>/", views.update_order_to_paid),
    path("deliver/<int:id>/", views.update_order_to_delivered),
    path("", views.get_all_orders)
]
