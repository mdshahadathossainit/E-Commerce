import os
import django
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def run_db_tasks():
    try:
        print("Starting migrations...")
        call_command('migrate', interactive=False)
        print("Migrations finished successfully!")
        
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        if not User.objects.filter(username="admin").exists():
            print("Creating superuser...")
            User.objects.create_superuser("admin", "admin@example.com", "admin123")
            print("Admin created successfully! (User: admin, Pass: admin123)")
        else:
            print("Admin already exists. Skipping creation.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_db_tasks()
