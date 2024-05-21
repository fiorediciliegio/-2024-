from django.db import models


# 项目表
class Project(models.Model):
    NUM_Project = models.CharField(verbose_name='项目编号', max_length=100)
    NAME_Project = models.CharField(verbose_name='项目名称', max_length=50)
    TYPE_Project = models.CharField(verbose_name='项目类型', max_length=50)
    VALUE_Project = models.CharField(verbose_name='项目价值', max_length=50, default='')
    START_Project = models.CharField(verbose_name='项目开始时间', max_length=20)
    END_Project = models.CharField(verbose_name='项目结束时间', max_length=20)
    ADDRESS_Project = models.CharField(verbose_name='项目地址', max_length=100)
    DESC_Project = models.CharField(verbose_name='项目描述', max_length=1000)
    id = models.AutoField(primary_key=True)
    MANA_Project = models.CharField(verbose_name='项目负责人', max_length=20, default='')
    CUR_Project = models.CharField(verbose_name='货币单位', max_length=50)


# 项目节点表
class ProjectNode(models.Model):
    id = models.AutoField(primary_key=True)
    NAME_Milestone = models.CharField(max_length=100)
    DDL_Milestone = models.DateField()
    DES_Milestone = models.CharField(max_length=1000, null=True, blank=True)
    PHEN_Milestone = models.CharField(max_length=10)
    ID_Project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='nodes')


# 人员表
class Person(models.Model):
    id = models.AutoField(primary_key=True)
    NAME_Person = models.CharField(max_length=20)
    NUM_Person = models.CharField(max_length=50)
    MAIL_Person = models.CharField(max_length=50)
    POS_Person = models.CharField(max_length=10)
    DESC_Person = models.CharField(max_length=1000, null=True, blank=True)
    ID_Project = models.ForeignKey(Project, on_delete=models.SET_NULL, related_name='person', null=True, blank=True)


# 文件表
class File(models.Model):
    FILE = models.FileField(upload_to='uploads/')
    NAME_File = models.CharField(max_length=255)
    SIZE_File = models.IntegerField()
    FORM_File = models.CharField(max_length=20)
    UPTIME_File = models.DateTimeField(auto_now_add=True)
    ID_Project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='file', default=1)