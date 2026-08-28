from rest_framework import serializers

from .models import (
    Order,
    OrderItem,
    Address,
)


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address

        fields = [
            "id",
            "full_name",
            "phone",
            "city",
            "address",
            "is_default",
        ]


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "price",
            "quantity",
            "subtotal",
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "full_name",
            "phone",
            "city",
            "shipping_address",
            "total",
            "status",
            "payment_status",
            "payment_method",
            "items",
            "created_at",
            "updated_at",
        ]