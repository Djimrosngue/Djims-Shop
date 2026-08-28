from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from products.models import Product

from .models import Cart, CartItem
from .serializers import CartSerializer


class CartAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get_cart(self, user):
        cart, created = Cart.objects.get_or_create(
            user=user
        )
        return cart

    def get(self, request):

        cart = self.get_cart(
            request.user
        )

        return Response(
            CartSerializer(cart).data
        )


class AddToCartAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        product_id = request.data.get(
            "product_id"
        )

        quantity = int(
            request.data.get(
                "quantity",
                1
            )
        )

        if quantity < 1:
            return Response(
                {
                    "error":
                    "La quantité doit être supérieure à 0."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(
            Product,
            id=product_id,
            is_active=True
        )

        if quantity > product.stock:
            return Response(
                {
                    "error":
                    "Stock insuffisant."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart, _ = Cart.objects.get_or_create(
            user=request.user
        )

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if created:
            item.quantity = quantity
        else:
            new_quantity = (
                item.quantity + quantity
            )

            if new_quantity > product.stock:
                return Response(
                    {
                        "error":
                        "Stock insuffisant."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            item.quantity = new_quantity

        item.save()

        return Response(
            CartSerializer(cart).data,
            status=status.HTTP_200_OK
        )


class UpdateCartItemAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(self, request, item_id):

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        item = get_object_or_404(
            CartItem,
            id=item_id,
            cart=cart
        )

        quantity = int(
            request.data.get(
                "quantity",
                1
            )
        )

        if quantity < 1:
            return Response(
                {
                    "error":
                    "Quantité invalide."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity > item.product.stock:
            return Response(
                {
                    "error":
                    "Stock insuffisant."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        item.quantity = quantity
        item.save()

        return Response(
            CartSerializer(cart).data
        )


class RemoveCartItemAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(self, request, item_id):

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        item = get_object_or_404(
            CartItem,
            id=item_id,
            cart=cart
        )

        item.delete()

        return Response(
            CartSerializer(cart).data
        )


class ClearCartAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(self, request):

        cart = get_object_or_404(
            Cart,
            user=request.user
        )

        cart.items.all().delete()

        return Response(
            {
                "message":
                "Panier vidé avec succès."
            }
        )