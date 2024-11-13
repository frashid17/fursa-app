from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-8xprzylm17fthun$a@c**klqx=hc!&qt1tnrzfq^y@8b!6p+@3'

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '0.0.0.0', '192.168.1.199', '10.0.1.215','10.0.1.18']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'authapp',
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

# CORS configuration - Allow all origins for testing (not recommended for production)
CORS_ALLOW_ALL_ORIGINS = True
# You can also configure specific origins for production:
# CORS_ALLOWED_ORIGINS = [
#     'http://yourfrontenddomain.com',
# ]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django Rest Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# JWT Settings (optional, but recommended)
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),  # Short expiration time for security
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),  # Refresh token valid for 1 day
    'ROTATE_REFRESH_TOKENS': False,  # Whether to rotate refresh tokens
    'BLACKLIST_AFTER_ROTATION': False,  # Whether to blacklist refresh tokens after use
    'ALGORITHM': 'HS256',  # JWT algorithm
    'SIGNING_KEY': SECRET_KEY,  # The signing key (should be same as SECRET_KEY)
    'AUTH_HEADER_TYPES': ('Bearer',),  # Default header type for passing token
    'USER_ID_FIELD': 'id',  # Default field to identify the user
    'USER_ID_CLAIM': 'user_id',  # Claim field for the user ID in the token
}

# Email backend configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 465  # SSL port for secure email communication
EMAIL_USE_SSL = True  # Use SSL instead of TLS
EMAIL_HOST_USER = 'frashid274@gmail.com'  # Replace with your Gmail address
EMAIL_HOST_PASSWORD = 'fjaz filc otco bmbc' # Replace with your Gmail password or app password
DEFAULT_FROM_EMAIL = 'frashid274@gmail.com'  # Default email for sending messages

# Email settings for Gmail
# Ensure you use App Password or turn off 2FA and allow less secure apps if 2FA is off
# You may need to configure your Google account to allow "less secure apps" 
# or use an "App Password" if you have two-factor authentication enabled.
