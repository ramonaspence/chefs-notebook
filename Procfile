release: python manage.py migrate
web: gunicorn conf.wsgi --log-file - --log-level debug
