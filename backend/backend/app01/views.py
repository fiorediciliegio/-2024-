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


# 项目列表显示
@api_view(['GET'])
def project_list(request, project=None):
    """显示项目列表"""
    if request.method == 'GET':
        try:
            projects = models.Project.objects.all()
            # 构造自定义的 JSON 格式数据
            projects_data = []
            for project in projects:
                project_data = {
                    'pjnumber': project.NUM_Project,
                    'pjname': project.NAME_Project,
                    'pjtype': project.TYPE_Project,
                    'pjmanager': project.MANA_Project,
                    'pjvalue': project.VALUE_Project,
                    'pjcurrency': project.CUR_Project,
                    'pjstart_date': project.START_Project,
                    'pjend_date': project.END_Project,
                    'pjaddress': project.ADDRESS_Project,
                    'pjdescription': project.DESC_Project
                }
                projects_data.append(project_data)

        return JsonResponse(projects_data, safe=False)
        except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

else:
return JsonResponse({"error": "Method not allowed"}, status=405)


# 添加项目
@api_view(['POST'])
def project_add(request):
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        try:
            data = json.loads(request.body)
            name_project = data.get("pjname")
            num_project = data.get("pjnumber")
            mana_project = data.get("pjmanager")
            type_project = data.get("pjtype")
            value_project = data.get("pjvalue")
            currency_int = data.get("pjcurrency")
            start_project = data.get("pjstart_date")
            end_project = data.get("pjend_date")
            address_project = data.get("pjaddress")
            desc_project = data.get("pjdescription")

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


# 删除项目
@api_view(['POST'])
def project_delete(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Project_id = data.get('pjid', None)
        if Project_id is not None:
            try:
                itemproject = Project.objects.get(id=Project_id)
                itemproject.delete()
                return JsonResponse({'message': 'Item deleted successfully.'})
            except YourModel.DoesNotExist:
                return JsonResponse({'message': 'Item not found.'}, status=404)
            except Exception as e:
                return JsonResponse({'message': str(e)}, status=500)
        else:
            return JsonResponse({'message': 'Invalid request data.'}, status=400)
    else:
        return JsonResponse({'message': 'Method not allowed.'}, status=405)


# 显示项目节点列表
"""这里需要获取项目id，前端通过api将项目id作为一部分返回来"""


@api_view(['GET'])
def projectnode_list(request, project_id=None):
    if request.method == 'GET':
        try:
            projectnodes = ProjectNode.objects.filter(ID_Project=project_id)
            projectnodes_data = []
            for projectnode in projectnodes:
                projectnode_data = {
                    'pjn_name': projectnode.NAME_Milestone,
                    'pjn_ddl': projectnode.DDL_Milestone,
                    'pjn_des': projectnode.DES_Milestone,
                    'pjn_phen': projectnode.PHEN_Milestone,
                }
                projectnodes_data.append(projectnode_data)
            return JsonResponse({'project_nodes': projectnodes_data})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


# 添加项目节点
@api_view(['POST'])
def projectnode_add(request):
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        try:
            data = json.loads(request.body)
            name_projectnode = data.get("pjn_name")
            ddl_projectnode = data.get("pjn_ddl")
            des_projectnode = data.get("pjn_des")
            phen_projectnode = data.get("pjn_phen")
        # 这里需要获取项目id，要存在于json文件里，不然无法实现级联删除
        """注意这里是pj_id"""
        id_project = data.get("pj_id")
        # 创建Project对象并保存到数据库
        project = models.ProjectNode.objects.create(NAME_Milestone=name_projectnode,
                                                    DDL_Milestone=ddl_projectnode,
                                                    DES_Milestone=des_projectnode,
                                                    PHEN_Milestone=phen_projectnode
        ID_Project = id_project)
        return JsonResponse({"message": "ProjectNode created successfully!"})
    except Exception as e:
    return JsonResponse({"error": str(e)}, status=500)

else:
return JsonResponse({"error": "Method not allowed"}, status=405)


# 删除项目节点
@api_view(['POST'])
def projectnode_delete(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Projectnode_id = data.get('pjn_id', None)
        if Project_id is not None:
            try:
                itemnode = ProjectNode.objects.get(id=Projectnode_id)
                itemnode.delete()
                return JsonResponse({'message': 'Item deleted successfully.'})
            except YourModel.DoesNotExist:
                return JsonResponse({'message': 'Item not found.'}, status=404)
            except Exception as e:
                return JsonResponse({'message': str(e)}, status=500)
        else:
            return JsonResponse({'message': 'Invalid request data.'}, status=400)
    else:
        return JsonResponse({'message': 'Method not allowed.'}, status=405)


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
