# Generated by Django 3.0.4 on 2020-03-10 16:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=155)),
                ('unit', models.CharField(default=None, max_length=25)),
                ('quantity', models.FloatField(default=None, max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(max_length=255)),
                ('instructions', models.TextField()),
                ('image', models.ImageField(upload_to='images/')),
                ('date_published', models.DateTimeField()),
                ('date_updated', models.DateTimeField()),
                ('tags', models.CharField(max_length=50)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('ingredients', models.ForeignKey(default=0, on_delete=django.db.models.deletion.PROTECT, to='recipes.Ingredient')),
            ],
        ),
    ]
