# Generated by Django 2.1.5 on 2019-03-27 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20190327_0419'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='relevent_file',
            field=models.FileField(blank=True, default=False, upload_to='files'),
        ),
    ]
