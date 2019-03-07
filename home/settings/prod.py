'''Use this for production'''

from .base import *
import dj_database_url

DEBUG = False
ALLOWED_HOSTS += ['*']
WSGI_APPLICATION = 'home.wsgi.application'

DATABASES = { 'default': dj_database_url.config() }

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
