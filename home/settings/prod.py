'''Use this for production'''

from .base import *
import dj_database_url

DEBUG = False
ALLOWED_HOSTS += ['*']
WSGI_APPLICATION = 'home.wsgi.prod.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
