# Generated by Django 3.0.5 on 2020-04-28 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200428_0335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timezone',
            name='difference_to_GMT',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
