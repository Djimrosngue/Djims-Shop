from django.urls import path

from .views import (
    CartAPIView,
    AddToCartAPIView,
    UpdateCartItemAPIView,
    RemoveCartItemAPIView,
    ClearCartAPIView,
)


urlpatterns = [

    path("",
        CartAPIView.as_view(),
        name="cart"
    ),

    path("add/",
        AddToCartAPIView.as_view(),
        name="cart_add"
    ),

    path("items/<int:item_id>/",
        UpdateCartItemAPIView.as_view(),
        name="cart_update"
    ),

    path("items/<int:item_id>/remove/",
        RemoveCartItemAPIView.as_view(),
        name="cart_remove"
    ),

    path(
        "clear/",
        ClearCartAPIView.as_view(),
        name="cart_clear"
    ),
]