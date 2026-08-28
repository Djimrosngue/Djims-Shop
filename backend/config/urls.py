from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)


urlpatterns = [

    # ==========================================
    # DJANGO ADMIN
    # ==========================================

    path(
        "admin/",
        admin.site.urls
    ),


    # ==========================================
    # PRODUCTS
    # ==========================================

    path(
        "api/v1/products/",
        include("products.urls")
    ),


    # ==========================================
    # CART
    # ==========================================

    path(
        "api/v1/cart/",
        include("cart.urls")
    ),


    # ==========================================
    # AUTHENTICATION
    # ==========================================

    path(
        "api/v1/auth/",
        include("accounts.urls")
    ),


    # ==========================================
    # DJANGO ALLAUTH
    # ==========================================

    path(
        "accounts/",
        include("allauth.urls")
    ),


    # ==========================================
    # ORDERS
    # ==========================================

    path(
        "api/v1/orders/",
        include("orders.urls")
    ),


    # ==========================================
    # PAYMENTS
    # ==========================================

    path(
        "api/v1/payments/",
        include("payments.urls")
    ),


    # ==========================================
    # API SCHEMA
    # ==========================================

    path(
        "api/schema/",
        SpectacularAPIView.as_view(),
        name="schema"
    ),


    # ==========================================
    # SWAGGER DOCUMENTATION
    # ==========================================

    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(
            url_name="schema"
        ),
        name="swagger-ui"
    ),

]


# ==========================================
# MEDIA FILES - DEVELOPMENT
# ==========================================

if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )