
from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView, OrderCreateView, RegisterView
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('products/<slug:slug>/', ProductDetailView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('orders/', OrderCreateView.as_view()),
]

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    
    path('products/', ProductListView.as_view()),
    path('products/<slug:slug>/', ProductDetailView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('orders/', OrderCreateView.as_view()),
]
