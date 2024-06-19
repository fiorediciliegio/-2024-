# Generated by Django 3.2.25 on 2024-05-31 09:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app01', '0018_auto_20240528_0934'),
    ]

    operations = [
        migrations.CreateModel(
            name='InspectionResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Item', models.CharField(max_length=100, verbose_name='检验对象名称')),
                ('VALUE_Standard', models.CharField(max_length=100, verbose_name='规定值或允许偏差')),
                ('RESULT_Inspect', models.CharField(max_length=50, verbose_name='检验结果')),
            ],
        ),
        migrations.CreateModel(
            name='QualityInspectionReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Project', models.CharField(max_length=200, verbose_name='工程名称')),
                ('PART_Num', models.CharField(max_length=200, verbose_name='检验部位以及编号')),
                ('INSPECTOR_Person', models.CharField(max_length=100, verbose_name='质检员')),
                ('TIME_Construct', models.DateField(verbose_name='施工时间')),
                ('TIME_Inspect', models.DateField(verbose_name='检验时间')),
                ('NUM_Report', models.CharField(max_length=100, verbose_name='报告编号')),
                ('OPINION_Inspector', models.CharField(max_length=500, verbose_name='质检员意见')),
                ('STATUS_Inspect', models.CharField(max_length=500, verbose_name='质检情况')),
                ('ID_Project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quality_reports', to='app01.project', verbose_name='项目')),
            ],
        ),
        migrations.CreateModel(
            name='SecurityCheckResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Item', models.CharField(max_length=100, verbose_name='检验项目')),
                ('STANDARD_Item', models.CharField(max_length=100, verbose_name='检验标准')),
                ('RESULT_Item', models.CharField(max_length=100, verbose_name='检验结果')),
            ],
        ),
        migrations.CreateModel(
            name='SecurityInspectionImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='security_inspection_images/')),
                ('DATE_Upload', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SecurityInspectionReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME_Project', models.CharField(max_length=100, verbose_name='工程名称')),
                ('NAME_SafetyOfficer', models.CharField(max_length=50, verbose_name='安全员')),
                ('NUM_Report', models.CharField(max_length=50, verbose_name='报告编号')),
                ('PART_Check', models.CharField(max_length=100, verbose_name='检查部位以及编号')),
                ('DATE_Check', models.CharField(max_length=20, verbose_name='检查时间')),
                ('FEEDBACK_SafetyOfficer', models.CharField(max_length=1000, verbose_name='安全员意见')),
                ('STATUS_Overall', models.CharField(max_length=1000, verbose_name='总体情况')),
                ('ID_Project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inspection_reports', to='app01.project', verbose_name='项目')),
            ],
        ),
        migrations.RemoveField(
            model_name='securityissueimage',
            name='security_issue',
        ),
        migrations.DeleteModel(
            name='SecurityIssue',
        ),
        migrations.DeleteModel(
            name='SecurityIssueImage',
        ),
        migrations.AddField(
            model_name='securityinspectionimage',
            name='ID_Report',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='app01.securityinspectionreport'),
        ),
        migrations.AddField(
            model_name='securitycheckresult',
            name='ID_Report',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='check_results', to='app01.securityinspectionreport'),
        ),
        migrations.AddField(
            model_name='inspectionresult',
            name='ID_Report',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inspection_results', to='app01.qualityinspectionreport'),
        ),
    ]
