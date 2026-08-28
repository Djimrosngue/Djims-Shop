import uuid

from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from orders.models import Order
from django.db import transaction

from .services.finalize import finalize_payment
from .models import Payment
from .serializers import PaymentSerializer
from .services.moov import (
    MoovPaymentService
)


class MoovPaymentAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        order_id = request.data.get(
            "order_id"
        )

        phone = request.data.get(
            "phone"
        )

        order = get_object_or_404(
            Order,
            id=order_id,
            user=request.user
        )

        if order.payment_status == "paid":

            return Response(
                {
                    "error":
                    "Cette commande est déjà payée."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not phone:

            return Response(
                {
                    "error":
                    "Le numéro Moov est obligatoire."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        transaction_id = str(
            uuid.uuid4()
        )

        payment = Payment.objects.create(

            order=order,

            user=request.user,

            provider="moov",

            transaction_id=transaction_id,

            phone=phone,

            amount=order.total,

            currency="XAF",

            status="pending"
        )

        try:

            service = (
                MoovPaymentService()
            )

            response = (
                service.initiate_payment(
                    payment
                )
            )

        except Exception as e:

            payment.status = "failed"

            payment.response_data = {
                "error": str(e)
            }

            payment.save()

            return Response(
                {
                    "error":
                    "Impossible d'initier le paiement."
                },
                status=status.HTTP_502_BAD_GATEWAY
            )

        return Response(
            {
                "message":
                    "Paiement initié.",

                "payment":
                    PaymentSerializer(
                        payment
                    ).data,

                "provider_response":
                    response,
            },
            status=status.HTTP_201_CREATED
        )

class MoovWebhookAPIView(APIView):

    authentication_classes = []

    permission_classes = []

    @transaction.atomic
    def post(self, request):

        data = request.data

        transaction_id = data.get(
            "transaction_id"
        )

        status_value = data.get(
            "status"
        )

        if not transaction_id:

            return Response(
                {
                    "error":
                    "transaction_id obligatoire."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        payment = Payment.objects.filter(
            transaction_id=transaction_id
        ).first()

        if not payment:

            return Response(
                {
                    "error":
                    "Paiement introuvable."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if status_value in [
            "success",
            "successful",
            "SUCCESS",
        ]:

            payment.status = "success"

            payment.response_data = data

            payment.save(
                update_fields=[
                    "status",
                    "response_data",
                    "updated_at",
                ]
            )

            try:

                finalize_payment(
                    payment
                )

            except ValueError as error:

                return Response(
                    {
                        "error": str(error)
                    },
                    status=status.HTTP_409_CONFLICT
                )

        elif status_value in [
            "failed",
            "FAILED",
            "cancelled",
        ]:

            payment.status = "failed"

            payment.response_data = data

            payment.save(
                update_fields=[
                    "status",
                    "response_data",
                    "updated_at",
                ]
            )

        return Response(
            {
                "message":
                    "Webhook traité."
            },
            status=status.HTTP_200_OK
        )

class PaymentDetailAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        payment_id
    ):

        payment = get_object_or_404(
            Payment,
            id=payment_id,
            user=request.user
        )

        return Response(
            PaymentSerializer(
                payment
            ).data
        )