# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-08 06:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0007_auto_20161008_0651'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(null=True, upload_to='%Y/%m/%d'),
        ),
    ]
