from django.contrib import admin
from .models import User, Category, Product, Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'price')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'payment_method', 'is_paid', 'is_delivered', 'created_at')
    list_filter = ('is_paid', 'is_delivered', 'payment_method')
    search_fields = ('user__username', 'id')
    inlines = [OrderItemInline]

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Product)
