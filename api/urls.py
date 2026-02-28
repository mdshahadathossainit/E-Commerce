from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ProductListView, 
    ProductDetailView, 
    CategoryListView, 
    OrderCreateView, 
    RegisterView, 
    CartViewSet,
    AdminProductStatsView
)

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    
    path('products/', ProductListView.as_view()),
    path('products/<slug:slug>/', ProductDetailView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('orders/', OrderCreateView.as_view()),
    path('admin-stats/', AdminProductStatsView.as_view()),
]
