from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from django.shortcuts import get_object_or_404

from .models import Product, Category,Product, ProductRating
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    ProductRatingSerializer,
)

# ==========================================================
# PRODUCTS
# ==========================================================

class ProductListAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        products = (
            Product.objects
            .filter(is_active=True)
            .select_related("category")
            .order_by("-created_at")
        )

        # RECHERCHE
        search = request.GET.get("search")

        if search:
            products = products.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )

        # FILTRE PAR CATEGORIE
        category = request.GET.get("category")

        if category:
            products = products.filter(
                category__slug=category
            )

        serializer = ProductSerializer(
            products,
            many=True,
            context={"request": request}
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# ==========================================================
# PRODUCT DETAIL
# ==========================================================

class ProductDetailAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, slug):

        try:

            product = (
                Product.objects
                .select_related("category")
                .get(
                    slug=slug,
                    is_active=True
                )
            )

        except Product.DoesNotExist:

            return Response(
                {
                    "detail": "Produit introuvable."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductSerializer(
            product,
            context={"request": request}
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# ==========================================================
# CATEGORIES
# ==========================================================

class CategoryListAPIView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        categories = (
            Category.objects
            .all()
            .order_by("name")
        )

        serializer = CategorySerializer(
            categories,
            many=True,
            context={"request": request}
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class ProductRatingAPIView(APIView):

    def get_permissions(self):

        if self.request.method == "GET":
            return [AllowAny()]

        return [IsAuthenticated()]


    def get(self, request, slug):

        product = get_object_or_404(
            Product,
            slug=slug,
            is_active=True
        )

        ratings = ProductRating.objects.filter(
            product=product
        ).select_related("user")

        serializer = ProductRatingSerializer(
            ratings,
            many=True
        )

        return Response({
            "average_rating": round(
                sum(r.rating for r in ratings) /
                ratings.count(),
                1
            ) if ratings.exists() else 0,

            "total_ratings": ratings.count(),

            "ratings": serializer.data,
        })


    def post(self, request, slug):

        product = get_object_or_404(
            Product,
            slug=slug,
            is_active=True
        )

        rating = request.data.get("rating")
        comment = request.data.get(
            "comment",
            ""
        )

        try:
            rating = int(rating)
        except (
            TypeError,
            ValueError
        ):
            return Response(
                {
                    "detail":
                    "La note doit être comprise entre 1 et 5."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        if rating < 1 or rating > 5:

            return Response(
                {
                    "detail":
                    "La note doit être comprise entre 1 et 5."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        product_rating, created = \
            ProductRating.objects.update_or_create(

                product=product,

                user=request.user,

                defaults={
                    "rating": rating,
                    "comment": comment,
                }
            )


        serializer = ProductRatingSerializer(
            product_rating
        )


        return Response(
            {
                "message":
                "Votre avis a été enregistré.",

                "rating":
                serializer.data,
            },

            status=(
                status.HTTP_201_CREATED
                if created
                else status.HTTP_200_OK
            )
        )