from pathlib import Path
import os
from datetime import timedelta

from dotenv import load_dotenv


# ==========================================
# BASE DIRECTORY
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ==========================================
# ENVIRONMENT VARIABLES
# ==========================================

load_dotenv(BASE_DIR / ".env")


# ==========================================
# SECURITY
# ==========================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-dev-key"
)

DEBUG = os.getenv(
    "DEBUG",
    "True"
) == "True"


# ==========================================
# ALLOWED HOSTS
# ==========================================

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",

    # Ajoute ici ton IP locale si nécessaire
    "10.116.144.96",
]


# ==========================================
# SITE
# ==========================================

SITE_ID = 1


# ==========================================
# CUSTOM USER MODEL
# ==========================================

AUTH_USER_MODEL = "accounts.User"


# ==========================================
# AUTHENTICATION BACKENDS
# ==========================================

AUTHENTICATION_BACKENDS = [

    "django.contrib.auth.backends.ModelBackend",

    "allauth.account.auth_backends.AuthenticationBackend",
]


# ==========================================
# APPLICATIONS
# ==========================================

INSTALLED_APPS = [

    # -------------------------
    # DJANGO
    # -------------------------

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # -------------------------
    # DJANGO SITES
    # -------------------------

    "django.contrib.sites",

    # -------------------------
    # DJANGO REST FRAMEWORK
    # -------------------------

    "rest_framework",

    # JWT
    "rest_framework_simplejwt",

    # JWT BLACKLIST
    "rest_framework_simplejwt.token_blacklist",

    # API DOCUMENTATION
    "drf_spectacular",

    # -------------------------
    # CORS
    # -------------------------

    "corsheaders",

    # -------------------------
    # PROJECT APPS
    # -------------------------

    "accounts",
    "products",
    "cart",
    "orders",
    "payments",
    "notifications",

    # -------------------------
    # DJANGO ALLAUTH
    # -------------------------

    "allauth",
    "allauth.account",
    "allauth.socialaccount",

    # SOCIAL PROVIDERS
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
]


# ==========================================
# MIDDLEWARE
# ==========================================

MIDDLEWARE = [

    # CORS
    # Important : avant CommonMiddleware
    "corsheaders.middleware.CorsMiddleware",

    # SECURITY
    "django.middleware.security.SecurityMiddleware",

    # SESSION
    "django.contrib.sessions.middleware.SessionMiddleware",

    # COMMON
    "django.middleware.common.CommonMiddleware",

    # CSRF
    "django.middleware.csrf.CsrfViewMiddleware",

    # AUTH
    "django.contrib.auth.middleware.AuthenticationMiddleware",

    # MESSAGES
    "django.contrib.messages.middleware.MessageMiddleware",

    # CLICKJACKING
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

    # DJANGO ALLAUTH
    "allauth.account.middleware.AccountMiddleware",
]


# ==========================================
# CORS CONFIGURATION
# ==========================================

CORS_ALLOWED_ORIGINS = [

    # React / Vite
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Autres ports éventuels
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://10.116.144.96:5173"
]


CORS_ALLOW_CREDENTIALS = True


# ==========================================
# CSRF TRUSTED ORIGINS
# ==========================================

CSRF_TRUSTED_ORIGINS = [

    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://:10.116.144.96:5173",
]


# ==========================================
# ROOT URL
# ==========================================

ROOT_URLCONF = "config.urls"


# ==========================================
# TEMPLATES
# ==========================================

TEMPLATES = [

    {
        "BACKEND":
            "django.template.backends.django.DjangoTemplates",

        "DIRS": [
            BASE_DIR / "templates",
        ],

        "APP_DIRS":
            True,

        "OPTIONS": {

            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ==========================================
# WSGI
# ==========================================

WSGI_APPLICATION = "config.wsgi.application"


# ==========================================
# DATABASE
# ==========================================

DATABASES = {

    "default": {

        "ENGINE":
            "django.db.backends.sqlite3",

        "NAME":
            BASE_DIR / "db.sqlite3",
    }
}


# ==========================================
# PASSWORD VALIDATION
# ==========================================

AUTH_PASSWORD_VALIDATORS = [

    {
        "NAME":
            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },

    {
        "NAME":
            "django.contrib.auth.password_validation.MinimumLengthValidator",
    },

    {
        "NAME":
            "django.contrib.auth.password_validation.CommonPasswordValidator",
    },

    {
        "NAME":
            "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ==========================================
# DJANGO REST FRAMEWORK
# ==========================================

REST_FRAMEWORK = {

    # AUTHENTICATION
    "DEFAULT_AUTHENTICATION_CLASSES": (

        "rest_framework_simplejwt.authentication.JWTAuthentication",

    ),

    # PERMISSIONS
    "DEFAULT_PERMISSION_CLASSES": (

        "rest_framework.permissions.AllowAny",

    ),

    # API SCHEMA
    "DEFAULT_SCHEMA_CLASS":
        "drf_spectacular.openapi.AutoSchema",
}


# ==========================================
# SIMPLE JWT
# ==========================================

SIMPLE_JWT = {

    # ACCESS TOKEN
    "ACCESS_TOKEN_LIFETIME":
        timedelta(minutes=30),

    # REFRESH TOKEN
    "REFRESH_TOKEN_LIFETIME":
        timedelta(days=7),

    # ROTATE REFRESH TOKEN
    "ROTATE_REFRESH_TOKENS":
        True,

    # BLACKLIST
    "BLACKLIST_AFTER_ROTATION":
        True,

    # AUTH HEADER
    "AUTH_HEADER_TYPES": (
        "Bearer",
    ),
}


# ==========================================
# DRF SPECTACULAR
# ==========================================

SPECTACULAR_SETTINGS = {

    "TITLE":
        "DJIM'S SHOP API",

    "DESCRIPTION":
        "API REST officielle de DJIM'S SHOP",

    "VERSION":
        "1.0.0",

    "SERVE_INCLUDE_SCHEMA":
        False,
}


# ==========================================
# DJANGO ALLAUTH
# ==========================================

ACCOUNT_LOGIN_METHODS = {
    "username",
    "email",
}


ACCOUNT_SIGNUP_FIELDS = [
    "email*",
    "username*",
    "password1*",
    "password2*",
]


ACCOUNT_EMAIL_VERIFICATION = "none"


# ==========================================
# GOOGLE / FACEBOOK
# ==========================================

SOCIALACCOUNT_PROVIDERS = {

    "google": {

        "SCOPE": [
            "profile",
            "email",
        ],

        "AUTH_PARAMS": {
            "access_type": "online",
        },
    },


    "facebook": {

        "METHOD": "oauth2",

        "SCOPE": [
            "email",
        ],
    },
}


# ==========================================
# MOOV MONEY
# ==========================================

MOOV_API_KEY = os.getenv(
    "MOOV_API_KEY"
)

MOOV_CLIENT_ID = os.getenv(
    "MOOV_CLIENT_ID"
)

MOOV_CLIENT_SECRET = os.getenv(
    "MOOV_CLIENT_SECRET"
)

MOOV_BASE_URL = os.getenv(
    "MOOV_BASE_URL"
)


# ==========================================
# INTERNATIONALIZATION
# ==========================================

LANGUAGE_CODE = "fr"

TIME_ZONE = "Africa/Ndjamena"

USE_I18N = True

USE_TZ = True


# ==========================================
# STATIC FILES
# ==========================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# ==========================================
# MEDIA FILES
# ==========================================

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


# ==========================================
# DEFAULT PRIMARY KEY
# ==========================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ==========================================
# EMAIL - DEVELOPMENT
# ==========================================

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend"
)


DEFAULT_FROM_EMAIL = (
    "DJIM'S SHOP <noreply@djimsshop.com>"
)