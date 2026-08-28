from django.urls import path

from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    CategoryListAPIView,
    ProductRatingAPIView,
)


urlpatterns = [

    path(
        "categories/",
        CategoryListAPIView.as_view(),
        name="category-list"
    ),

    path(
        "",
        ProductListAPIView.as_view(),
        name="product-list"
    ),
    path(
        "<slug:slug>/ratings/",
        ProductRatingAPIView.as_view(),
        name="product-ratings"
    ),
    path(
        "<slug:slug>/",
        ProductDetailAPIView.as_view(),
        name="product-detail"
    ),

]