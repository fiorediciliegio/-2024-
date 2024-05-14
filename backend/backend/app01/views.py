from django.shortcuts import render, redirect
from app01 import models
from flask import Flask
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Project
from .models import ProjectNode
from .models import Person
from .models import File
import os
import json
import datetime
from datetime import datetime
from django.db.models import Count


# 项目列表显示
@api_view(['GET'])
def project_list(request, projectId=None):
    """显示项目列表"""
    if request.method == 'GET':
        try:
            if projectId:
                # 如果提供了项目名称，则返回特定项目的信息
                project_info = Project.objects.get(id=projectId)
                return JsonResponse({'projects_data': {
                    'pjnumber': project_info.NUM_Project,
                    'pjname': project_info.NAME_Project,
                    'pjtype': project_info.TYPE_Project,
                    'pjmanager': project_info.MANA_Project,
                    'pjvalue': project_info.VALUE_Project,
                    'pjcurrency': project_info.CUR_Project,
                    'pjstart_date': project_info.START_Project,
                    'pjend_date': project_info.END_Project,
                    'pjaddress': project_info.ADDRESS_Project,
                    'pjdescription': project_info.DESC_Project,
                    'pjid': project_info.id
                }})
            else:
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
                        'pjdescription': project.DESC_Project,
                        'pjid': project.id
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
                    'pjn_id': projectnode.id,
                    'pjn_name': projectnode.NAME_Milestone,
                    'pjn_ddl': str(projectnode.DDL_Milestone),
                    'pjn_des': projectnode.DES_Milestone,
                    'pjn_status': projectnode.PHEN_Milestone,
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
            ddl_projectnode_str = data.get("pjn_ddl")  # 从 JSON 中获取日期字符串
            des_projectnode = data.get("pjn_des")
            phen_projectnode = data.get("pjn_status")
            id_project = data.get("pj_id")

            # 解析日期字符串为 datetime 对象
            if ddl_projectnode_str:
                ddl_projectnode = datetime.strptime(ddl_projectnode_str, '%Y-%m-%d')
            else:
                raise ValueError("Date string is empty!")

            project_instance = models.Project.objects.get(id=id_project)

            # 创建 ProjectNode 对象并保存到数据库
            project = models.ProjectNode.objects.create(NAME_Milestone=name_projectnode,
                                                        DDL_Milestone=ddl_projectnode,
                                                        DES_Milestone=des_projectnode,
                                                        PHEN_Milestone=phen_projectnode,
                                                        ID_Project=project_instance)
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
        if Projectnode_id is not None:
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


# 统计节点状态
@api_view(['GET'])
def projectnode_collect(request, project_id=None):
    """统计指定项目下三个不同状态的数据数量"""
    try:
        if project_id is None:
            return JsonResponse({"error": "Project ID is required."}, status=400)
        completed_count = ProjectNode.objects.filter(ID_Project=project_id, PHEN_Milestone='已完成').count()
        in_progress_count = ProjectNode.objects.filter(ID_Project=project_id, PHEN_Milestone='进行中').count()
        pending_count = ProjectNode.objects.filter(ID_Project=project_id, PHEN_Milestone='未处理').count()
        data = {
            'completed_count': completed_count,
            'in_progress_count': in_progress_count,
            'pending_count': pending_count
        }
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# 更新节点状态
@api_view(['POST'])
def projectnode_update_phen(request, node_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_phen_milestone = data.get('new_pjn_status', None)

            if node_id is None or new_phen_milestone is None:
                return JsonResponse({'error': 'Missing required parameters.'}, status=400)

            # 查找对应的项目节点
            project_node = ProjectNode.objects.get(id=node_id)

            # 更新 PHEN_Milestone
            project_node.PHEN_Milestone = new_phen_milestone
            project_node.save()

            return JsonResponse({'message': 'Project node updated successfully.'})
        except ProjectNode.DoesNotExist:
            return JsonResponse({'error': 'Project node not found.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)


# 添加人员(总项目界面)
@api_view(['POST'])
def person_add(request):
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        try:
            data = json.loads(request.body)
            name_person = data.get("pername")
            num_person = data.get("pernumber")
            mail_person = data.get("permail")
            position_person = data.get("perrole")
            desc_person = data.get("perdescription")
            id_project = data.get("pj_id")

            # 如果 id_project 为 None，则将 ID_Project 设置为 None
            if id_project is None:
                id_project = None

            # 创建Project对象并保存到数据库
            project = models.Person.objects.create(NAME_Person=name_person,
                                                   NUM_Person=num_person,
                                                   MAIL_Person=mail_person,
                                                   POS_Person=position_person,
                                                   DESC_Person=desc_person,
                                                   ID_Project=id_project)
            return JsonResponse({"message": "Project created successfully!"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


# 添加人员(单项目界面)
@api_view(['POST'])
def person_add_project(request, project_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            person_ids = data.get('person_ids', None)

            if project_id is None or person_ids is None:
                return JsonResponse({'error': 'Missing required parameters.'}, status=400)

            # 更新人员的 ID_Project
            Person.objects.filter(id__in=person_ids).update(ID_Project=project_id)

            return JsonResponse({'message': 'Persons updated successfully.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)


# 显示人员列表（主界面）
@api_view(['GET'])
def person_list(request, personId=None):
    if request.method == 'GET':
        try:
            if personId:
                # 则返回特定人员的信息
                person_info = models.Person.objects.get(id=personId)
                return JsonResponse({'projects_data': {
                    'pername': person_info.NAME_Person,
                    'pernumber': person_info.NUM_Person,
                    'permail': person_info.MAIL_Person,
                    'perrole': person_info.POS_Person,
                    'perdescription': person_info.DESC_Person,
                    'perid': person_info.id
                }})
            else:
                persons = models.Person.objects.all()
                # 构造自定义的 JSON 格式数据
                persons_data = []
                for person in persons:
                    person_data = {
                        'pername': person.NAME_Person,
                        'pernumber': person.NUM_Person,
                        'permail': person.MAIL_Person,
                        'perrole': person.POS_Person,
                        'perdescription': person.DESC_Person,
                        'perid': person.id
                    }
                    persons_data.append(person_data)
                return JsonResponse(persons_data, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


# 显示人员列表（单个项目界面）
@api_view(['GET'])
def person_project_list(request, project_id):
    if request.method == 'GET':
        try:
            # 根据项目ID筛选人员列表
            persons = Person.objects.filter(ID_Project=project_id)

            # 构造人员数据
            persons_data = []
            for person in persons:
                person_data = {
                    'perid': person.id,
                    'pername': person.NAME_Person,
                    'pernumber': person.NUM_Person,
                    'peremail': person.MAIL_Person,
                    'perrole': person.POS_Person,
                    'perdescription': person.DESC_Person
                }
                persons_data.append(person_data)

            return JsonResponse(persons_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)


# 统计各职位人员数量（总界面+单项目界面）
@api_view(['GET'])
def person_collect(request, project_id=None):
    if request.method == 'GET':
        try:
            # 定义要统计的职位列表
            positions = ['项目经理', '工程师', '施工员', '财务人员', '安全主管', '质量控制员']

            # 初始化统计结果字典
            count_data = {}
            for position in positions:
                count_data[position] = 0

            # 根据项目 ID 和职位进行筛选
            if project_id:
                persons = Person.objects.filter(ID_Project=project_id, POS_Person__in=positions)
            else:
                persons = Person.objects.filter(POS_Person__in=positions)

            # 统计数量
            for person in persons:
                count_data[person.POS_Person] += 1

            return JsonResponse(count_data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


# 删除人员
@api_view(['POST'])
def person_delete(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Person_id = data.get('perid', None)
        if Person_id is not None:
            try:
                this_person = Person.objects.get(id=Person_id)
                this_person.delete()
                return JsonResponse({'message': 'Person deleted successfully.'})
            except YourModel.DoesNotExist:
                return JsonResponse({'message': 'Person not found.'}, status=404)
            except Exception as e:
                return JsonResponse({'message': str(e)}, status=500)
        else:
            return JsonResponse({'message': 'Invalid request data.'}, status=400)
    else:
        return JsonResponse({'message': 'Method not allowed.'}, status=405)


# 上传文件
@api_view(['POST'])
def file_upload(request, project_id=None):
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            uploaded_file = request.FILES['file']

            # 获取文件信息
            file_name, file_extension = os.path.splitext(uploaded_file.name)
            file_size = uploaded_file.size
            file_upload_time = datetime.datetime.now()

            # 存入数据
            file_instance = File.objects.create(
                file=uploaded_file,
                name=file_name,
                size=file_size,
                file_format=file_extension,
                upload_time=file_upload_time,
                ID_Project_id=project_id
            )
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
