# Generated by Django 4.1.3 on 2024-07-07 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mecanicos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=255, unique=True, verbose_name='Correo electrónico'),
        ),
    ]