from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_product_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics/'),
        ),
    ]
