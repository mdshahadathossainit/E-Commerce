import os
import django
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def run_migrations():
    try:
        print("Starting migrations...")
        call_command('migrate', interactive=False)
        print("Migrations finished successfully!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_migrations()
