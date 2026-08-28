from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from django.contrib.auth import authenticate

from .serializers import (
    RegisterSerializer,
    UserSerializer,
)


# ==========================================================
# REGISTER
# ==========================================================

class RegisterAPIView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Compte créé avec succès.",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ==========================================================
# LOGIN
# ==========================================================

class LoginAPIView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        username = request.data.get(
            "username"
        )

        password = request.data.get(
            "password"
        )

        # Vérification username

        if not username:

            return Response(
                {
                    "detail":
                        "Le nom utilisateur est requis."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Vérification password

        if not password:

            return Response(
                {
                    "detail":
                        "Le mot de passe est requis."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Authentification Django

        user = authenticate(
            request=request,
            username=username,
            password=password
        )

        if user is None:

            return Response(
                {
                    "detail":
                        "Nom utilisateur ou mot de passe incorrect."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Création JWT

        refresh = RefreshToken.for_user(user)

        access = refresh.access_token

        return Response(
            {
                "message":
                    "Connexion réussie.",

                "access":
                    str(access),

                "refresh":
                    str(refresh),

                "user":
                    UserSerializer(user).data,
            },
            status=status.HTTP_200_OK
        )


# ==========================================================
# PROFILE
# ==========================================================

class ProfileAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    # ======================================================
    # GET PROFILE
    # ======================================================

    def get(self, request):

        serializer = UserSerializer(
            request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # ======================================================
    # PATCH PROFILE
    # ======================================================

    def patch(self, request):

        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message":
                        "Profil mis à jour avec succès.",

                    "user":
                        UserSerializer(user).data,
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ==========================================================
# LOGOUT
# ==========================================================

class LogoutAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        refresh_token = request.data.get(
            "refresh"
        )

        if not refresh_token:

            return Response(
                {
                    "detail":
                        "Le refresh token est requis."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            token = RefreshToken(
                refresh_token
            )

            token.blacklist()

            return Response(
                {
                    "detail":
                        "Déconnexion réussie."
                },
                status=status.HTTP_205_RESET_CONTENT
            )

        except TokenError:

            return Response(
                {
                    "detail":
                        "Refresh token invalide ou déjà révoqué."
                },
                status=status.HTTP_400_BAD_REQUEST
            )