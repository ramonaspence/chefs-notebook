# Generated by Django 3.0.4 on 2020-03-15 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0005_auto_20200314_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='recipes.Recipe'),
        ),
    ]
