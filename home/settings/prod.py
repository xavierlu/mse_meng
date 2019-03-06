'''Use this for production'''

from .base import *
import dj_database_url

DEBUG = True
WSGI_APPLICATION = 'home.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase',
        'USER': 'eptfsmtlyggzvl',
        'PASSWORD': '748a2dc44a0332771cd8c1e4a58676365073be60a89fdb798c389aa434c8a65c',
        'HOST': 'ec2-54-204-2-25.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
