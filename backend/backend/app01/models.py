from django.db import models
# 定义项目表


class Project(models.Model):
    NUM_Project = models.CharField(verbose_name='项目编号', max_length=100)
    NAME_Project = models.CharField(verbose_name='项目名称', max_length=50)
    TYPE_Project = models.CharField(verbose_name='项目类型', max_length=50)
    VALUE_Project = models.CharField(verbose_name='项目价值', max_length=50,default='')
    START_Project = models.CharField(verbose_name='项目开始时间',max_length=20)
    END_Project = models.CharField(verbose_name='项目结束时间', max_length=20)
    ADDRESS_Project = models.CharField(verbose_name='项目地址', max_length=100)
    DESC_Project = models.CharField(verbose_name='项目描述', max_length=1000)
    id = models.AutoField(primary_key=True)
    MANA_Project = models.CharField(verbose_name='项目负责人', max_length=20)

    Currency_Unit = (
        (1, "USD"),
        (2, "CNY"),
        (3, "EUR"),
        (4, "JPY"),
        (5, "BTC")
    )
    CUR_Project = models.CharField(verbose_name='货币单位', max_length=50)
