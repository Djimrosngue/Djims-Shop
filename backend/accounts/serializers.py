from rest_framework import serializers

from .models import User


# ==========================================================
# REGISTER SERIALIZER
# ==========================================================

class RegisterSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
            "phone",
            "address",
        ]

        read_only_fields = [
            "id",
        ]

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user


# ==========================================================
# USER SERIALIZER
# ==========================================================

class UserSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "address",
            "avatar",
        ]

        read_only_fields = [
            "id",
        ]

    # ======================================================
    # UPDATE PROFILE
    # ======================================================

    def update(
        self,
        instance,
        validated_data
    ):

        instance.username = validated_data.get(
            "username",
            instance.username
        )

        instance.email = validated_data.get(
            "email",
            instance.email
        )

        instance.phone = validated_data.get(
            "phone",
            instance.phone
        )

        instance.address = validated_data.get(
            "address",
            instance.address
        )

        if "avatar" in validated_data:

            instance.avatar = validated_data.get(
                "avatar"
            )

        instance.save()

        return instance