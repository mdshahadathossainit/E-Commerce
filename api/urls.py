
from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView, OrderCreateView

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('products/<slug:slug>/', ProductDetailView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('orders/', OrderCreateView.as_view()),
]
