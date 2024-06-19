# Generated by Django 3.2.25 on 2024-05-27 12:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app01', '0016_inspectionitem_qualityinspectiontemplate'),
    ]

    operations = [
        migrations.CreateModel(
            name='SecurityIssue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Issue', models.CharField(max_length=100)),
                ('TIME_Issue', models.DateTimeField()),
                ('PLACE_Issue', models.CharField(max_length=100)),
                ('PERSON_Issue', models.CharField(max_length=20)),
                ('DES_Issue', models.CharField(help_text='问题描述至少20字', max_length=1000, verbose_name='问题描述')),
                ('ATTACH_Issue', models.FileField(blank=True, null=True, upload_to='attachments/')),
            ],
        ),
        migrations.CreateModel(
            name='SecurityCheckTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Sct', models.CharField(max_length=20)),
                ('ID_Project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='SCT', to='app01.project')),
            ],
        ),
        migrations.CreateModel(
            name='SecurityCheckItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Item', models.CharField(max_length=20)),
                ('VALUE_Item', models.CharField(max_length=30)),
                ('ID_Sct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app01.securitychecktemplate')),
            ],
        ),
    ]
