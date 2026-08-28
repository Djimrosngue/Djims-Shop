from rest_framework import serializers

from .models import Category, Product ,ProductRating


# ==========================================================
# CATEGORY
# ==========================================================

class CategorySerializer(serializers.ModelSerializer):

    product_count = serializers.IntegerField(
        source="products.count",
        read_only=True
    )

    image_url = serializers.SerializerMethodField()

    class Meta:

        model = Category

        fields = [
            "id",
            "name",
            "slug",
            "image",
            "image_url",
            "product_count",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "product_count",
            "image_url",
        ]

    def get_image_url(self, obj):

        request = self.context.get("request")

        if obj.image:

            if request:
                return request.build_absolute_uri(
                    obj.image.url
                )

            return obj.image.url

        return None


# ==========================================================
# PRODUCT
# ==========================================================

class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    category_slug = serializers.CharField(
        source="category.slug",
        read_only=True
    )

    image_url = serializers.SerializerMethodField()

    class Meta:

        model = Product

        fields = [
            "id",
            "category",
            "category_name",
            "category_slug",
            "title",
            "slug",
            "description",
            "price",
            "stock",
            "image",
            "image_url",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "category_name",
            "category_slug",
            "image_url",
        ]

    def get_image_url(self, obj):

        request = self.context.get("request")

        if obj.image:

            if request:
                return request.build_absolute_uri(
                    obj.image.url
                )

            return obj.image.url

        return None



class ProductRatingSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = ProductRating

        fields = [
            "id",
            "username",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "username",
            "created_at",
            "updated_at",
        ]