# Generated by Django 3.0.4 on 2020-03-10 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0004_auto_20200310_1346'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='unit',
            field=models.CharField(default=False, max_length=25),
        ),
    ]
