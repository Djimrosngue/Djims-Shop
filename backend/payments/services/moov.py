import uuid
import requests

from django.conf import settings

from .base import PaymentService


class MoovPaymentService(
    PaymentService
):

    def initiate_payment(
        self,
        payment
    ):

        transaction_id = str(
            uuid.uuid4()
        )

        # À remplacer par l'endpoint
        # officiel fourni par Moov Tchad.

        url = (
            f"{settings.MOOV_BASE_URL}"
            "/payment"
        )

        headers = {
            "Authorization":
                f"Bearer {settings.MOOV_API_KEY}",

            "Content-Type":
                "application/json",
        }

        payload = {

            "transaction_id":
                transaction_id,

            "amount":
                str(payment.amount),

            "currency":
                payment.currency,

            "phone":
                payment.phone,
        }

        response = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=30
        )

        data = response.json()

        payment.provider_transaction_id = (
            data.get("transaction_id")
        )

        payment.response_data = data

        payment.save()

        return data

    def check_payment(
        self,
        payment
    ):

        # À connecter à l'endpoint
        # officiel de vérification Moov.

        return {
            "status":
                payment.status
        }