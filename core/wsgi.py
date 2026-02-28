import os
from django.core.wsgi import get_wsgi_application
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
application = get_wsgi_application()

User = get_user_model()
username = "admin" # 
email = "m.shahadat.hossain.it@gmail.com"
password = "admin123" 

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser '{username}' created successfully!")
