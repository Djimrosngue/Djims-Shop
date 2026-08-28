from django.urls import path

from .views import (
    CreateOrderAPIView,
    OrderListAPIView,
    OrderDetailAPIView,
)


urlpatterns = [

    path(
        "",
        OrderListAPIView.as_view(),
        name="orders"
    ),

    path(
        "create/",
        CreateOrderAPIView.as_view(),
        name="order_create"
    ),

    path(
        "<int:order_id>/",
        OrderDetailAPIView.as_view(),
        name="order_detail"
    ),
]