from rest_framework import generics, permissions
from .models import Product, Category, Order
from .serializers import ProductSerializer, CategorySerializer, OrderSerializer, CartSerializer, CartItemSerializer
from .serializers import RegisterSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import Product, Category, Order, Cart, CartItem

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        search = self.request.query_params.get('search')
        category = self.request.query_params.get('category')
        
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))
        if category:
            queryset = queryset.filter(category__slug=category)
        return queryset

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = Product.objects.get(id=product_id)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()
        
        return Response({'message': 'Product added to cart'}, status=status.HTTP_200_OK)


class AdminProductStatsView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        product_count = Product.objects.count()
        order_count = Order.objects.count()
        total_sales = sum(order.total_price for order in Order.objects.filter(is_paid=True))
        
        return Response({
            'total_products': product_count,
            'total_orders': order_count,
            'total_sales': total_sales
        })
        
