'''Use this for production'''

from .base import *
import dj_database_url

DEBUG = True
ALLOWED_HOSTS += ['*']
WSGI_APPLICATION = 'home.wsgi.application'

'''DATABASES = { 'default': dj_database_url.config() }'''
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
