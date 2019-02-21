release: python manage.py migrate
web: gunicorn home.wsgi -b 0.0.0.0:$PORT