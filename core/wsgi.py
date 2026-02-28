import os
from django.core.wsgi import get_wsgi_application
from django.contrib.auth import get_user_model
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
application = get_wsgi_application()
try:
    User = get_user_model()
    username = "admin"
    email = "admin@example.com"
    password = "admin123"

    if "api_user" in connection.introspection.table_names():
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            print(f"Superuser '{username}' created successfully!")
except Exception as e:
    print(f"Admin creation skipped: {e}")
