from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "accounts"

urlpatterns = [
    path('register/', views.register),
    path('account_activate/', views.account_activate),
    path('get_user/', views.get_user),
    path('logout/', views.BlacklistTokenUpdateView.as_view()),
    path('edit_user/', views.edit_user),
    path("change_password/<int:pk>/", views.ChangePasswordView.as_view()),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("request_password_reset/", views.request_password_reset),
    path("password_reset/", views.password_reset),
    path('users/', views.get_users),
    path('users/<int:id>/', views.get_user_by_id),
    path('users/edit/<int:id>/', views.admin_user_edit),
    path('users/delete/<int:id>/', views.delete_user),
]
