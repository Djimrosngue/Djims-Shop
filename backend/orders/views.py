from decimal import Decimal

from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from cart.models import Cart

from .models import Order, OrderItem
from .serializers import OrderSerializer


class CreateOrderAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    @transaction.atomic
    def post(self, request):

        cart = Cart.objects.filter(
            user=request.user
        ).first()

        if not cart or not cart.items.exists():

            return Response(
                {
                    "error":
                    "Votre panier est vide."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        full_name = request.data.get(
            "full_name"
        )

        phone = request.data.get(
            "phone"
        )

        city = request.data.get(
            "city"
        )

        shipping_address = request.data.get(
            "shipping_address"
        )

        payment_method = request.data.get(
            "payment_method"
        )

        if not all([
            full_name,
            phone,
            city,
            shipping_address,
            payment_method,
        ]):

            return Response(
                {
                    "error":
                    "Tous les champs sont obligatoires."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if payment_method not in [
            "moov",
            "airtel",
            "stripe",
        ]:

            return Response(
                {
                    "error":
                    "Méthode de paiement invalide."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Vérification stock
        for item in cart.items.select_related(
            "product"
        ):

            if item.quantity > item.product.stock:

                return Response(
                    {
                        "error":
                        f"Stock insuffisant pour "
                        f"{item.product.title}."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        total = Decimal("0.00")

        order = Order.objects.create(
            user=request.user,
            full_name=full_name,
            phone=phone,
            city=city,
            shipping_address=shipping_address,
            total=0,
            payment_method=payment_method,
            payment_status="pending",
        )

        for item in cart.items.select_related(
            "product"
        ):

            subtotal = (
                item.product.price *
                item.quantity
            )

            total += subtotal

            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.title,
                price=item.product.price,
                quantity=item.quantity,
                subtotal=subtotal,
            )

        order.total = total
        order.save()

        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )


class OrderListAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        orders = Order.objects.filter(
            user=request.user
        ).prefetch_related(
            "items"
        ).order_by(
            "-created_at"
        )

        return Response(
            OrderSerializer(
                orders,
                many=True
            ).data
        )


class OrderDetailAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, order_id):

        order = get_object_or_404(
            Order,
            id=order_id,
            user=request.user
        )

        return Response(
            OrderSerializer(order).data
        )