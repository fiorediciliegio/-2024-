from django.shortcuts import render, redirect
from app01 import models
from flask import Flask
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project
"""from .serializers import ProjectSerializer"""
import json

def project_list(request):
    """显示项目列表"""
    # 获取数据库的列表 获取的格式为一个列表[一行数据，一行数据...]
    projects = models.Project.objects.all()
    for obj in projects:
        obj.get_CUR_Project_display()  # 将货币单位以字符形式显示
    return render(request, 'project_list.html', {'projects': projects})

@api_view(['GET', 'POST'])
def project_add(request):
    """显示’添加项目‘界面"""
    if request.method == 'GET':
        return render(request, 'project_add.html')
    # 获取传输的数据
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        try:
            data = json.loads(request.body)
            name_project=data.get("pjname"),
            num_project=data.get("pjnumber"),
            mana_project=data.get("pjmanager"),
            type_project=data.get("pjtype"),
            value_project=data.get("pjvalue"),
            currency_int=data.get("pjcurrency"),
            start_project=data.get("pjstart_date"),
            end_project=data.get("pjend_date"),
            address_project=data.get("pjaddress"),
            desc_project=data.get("pjdescription")

        # 创建Project对象并保存到数据库
            project = models.Project.objects.create(NUM_Project=num_project,
                                                    NAME_Project=name_project,
                                                    TYPE_Project=type_project,
                                                    MANA_Project=mana_project,
                                                    ADDRESS_Project=address_project,
                                                    VALUE_Project=value_project,
                                                    CUR_Project=currency_int,
                                                    START_Project=start_project,
                                                    END_Project=end_project,
                                                    DESC_Project=desc_project)
            return JsonResponse({"message": "Project created successfully!"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


def project_delete(request):
    """删除项目"""
    # 获取id
    nid = request.GET.get('nid')
    # 删除id
    models.Project.objects.filter(id=nid).delete()
    # 回去
    return redirect("/project/list/")


def project_edit(request):
    """修改项目"""
    # 获取更改对象
    nid = request.GET.get('nid')
    row_object = models.Project.objects.filter(id=nid).first()
    if request.method == 'GET':
        return render(request, 'project_edit.html', {'row_object': row_object})
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        num_project = request.POST.get('NUM_Project')
        name_project = request.POST.get('NAME_Project')
        type_project = request.POST.get('TYPE_Project')
        mana_project = request.POST.get('MANA_Project')
        address_project = request.POST.get('ADDRESS_Project')

        # 获取货币单位的整数值
        currency_int = int(request.POST.get('CUR_Project', 0))

        value_project = int(request.POST.get('VALUE_Project', 0))
        start_project = request.POST.get('START_Project', '')
        end_project = request.POST.get('END_Project', '')
        desc_project = request.POST.get('DESC_Project', '')

        # 更新对象的字段值
        row_object.NUM_Project = num_project
        row_object.NAME_Project = name_project
        row_object.TYPE_Project = type_project
        row_object.MANA_Project = mana_project
        row_object.ADDRESS_Project = address_project
        row_object.VALUE_Project = value_project
        row_object.CUR_Project = int(currency_int)
        row_object.START_Project = start_project
        row_object.END_Project = end_project
        row_object.DESC_Project = desc_project

        # 保存更改到数据库
        row_object.save()

        # 重定向到项目列表页面
        return redirect('/project/list/')


def test(request):
    return render(request, 'test.html')
