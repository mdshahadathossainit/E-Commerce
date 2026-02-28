import os
import time
from django.core.wsgi import get_wsgi_application
from django.core.management import call_command
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
application = get_wsgi_application()

def run_startup_tasks():
    try:
        time.sleep(2) 
        print("Forcing API migrations...")
        call_command('migrate', 'api', interactive=False)
        print("Running remaining migrations...")
        call_command('migrate', interactive=False)
        from django.contrib.auth import get_user_model
        User = get_user_model()
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@example.com", "admin123")
            print("Admin created!")

    except Exception as e:
        print(f"Startup failed: {e}")

run_startup_tasks()
