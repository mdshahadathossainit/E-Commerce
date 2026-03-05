from rest_framework import serializers
from .models import User, Category, Product, Cart, CartItem, Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'address', 'photo']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'phone', 'address', 'photo']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
            photo=validated_data.get('photo', None)
        )
        return user
