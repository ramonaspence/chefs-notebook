# Generated by Django 3.0.4 on 2020-03-10 13:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_ingredient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredient',
            name='recipe',
        ),
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.PROTECT, to='frontend.Ingredient'),
        ),
    ]
