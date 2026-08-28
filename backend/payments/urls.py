from django.urls import path

from .views import (
    MoovPaymentAPIView,
    MoovWebhookAPIView,
    PaymentDetailAPIView,
)


urlpatterns = [

    path("moov/",
        MoovPaymentAPIView.as_view(),
        name="payment_moov"
    ),

    path("moov/webhook/",
        MoovWebhookAPIView.as_view(),
        name="payment_moov_webhook"
    ),
    path("<int:payment_id>/",
    PaymentDetailAPIView.as_view(),
    name="payment_detail"
),
]