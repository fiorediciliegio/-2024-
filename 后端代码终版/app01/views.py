from django.shortcuts import render, redirect
from django.db.models import Q
from app01 import models
from flask import Flask
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.utils.encoding import smart_str
from django.db import transaction
from .models import Project
from .models import ProjectNode
from .models import Person
from .models import File
from .models import QualityInspectionTemplate
from .models import QualityInspectionReport
from .models import InspectionItem
from .models import InspectionResult
from .models import SecurityCheckTemplate
from .models import SecurityCheckItem
from .models import SecurityInspectionReport
from .models import SecurityCheckResult
from .models import SecurityInspectionImage
from .models import SafetyIssueSolution
from .models import CostInformation
from .models import User
from django.db.models.functions import ExtractQuarter
import os
import json
import datetime
from django.db.models import Count
import mimetypes
from docx import Document
from io import BytesIO
from django.db.models import Sum
from django.db.models.functions import TruncMonth
import calendar

"""登录"""
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            try:
                user = User.objects.get(NAME_USER=username)
                Password = user.PASSWORD
                if Password == Password:
                    # 这里可以执行登录操作，如创建 session 或返回 token
                    return JsonResponse({
                        "message": "登录成功",
                        "username": user.NAME_USER,
                        "level": user.LEVEL
                    }, status=200)
                else:
                    return JsonResponse({"error": "密码错误"}, status=400)
            except User.DoesNotExist:
                return JsonResponse({"error": "用户名不存在"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

"""项目管理部分"""

#项目列表显示
@api_view(['GET'])
def project_list(request,projectId=None):
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


#添加项目
@api_view(['POST'])
def project_add(request):
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        try:
            data = json.loads(request.body)
            name_project=data.get("pjname")
            num_project=data.get("pjnumber")
            mana_project=data.get("pjmanager")
            type_project=data.get("pjtype")
            value_project=data.get("pjvalue")
            currency_int=data.get("pjcurrency")
            start_project=data.get("pjstart_date")
            end_project=data.get("pjend_date")
            address_project=data.get("pjaddress")
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


#删除项目
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


#显示项目节点列表
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
                ddl_projectnode = datetime.datetime.strptime(ddl_projectnode_str, '%Y-%m-%d')
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


#删除项目节点
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
        
        
#统计节点状态
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
        
        
#更新节点状态
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





"""人员管理部分"""

#添加人员(总项目界面)
@api_view(['POST'])
def person_add(request):
    if request.method == 'POST':
        # 从POST请求中获取所有数据
        try:
            data = json.loads(request.body)
            name_person=data.get("pername")
            num_person=data.get("pernumber")
            mail_person=data.get("permail")
            position_person=data.get("perrole")
            desc_person=data.get("perdescription")
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
        
        
#添加人员(单项目界面)
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
        
        
#显示人员列表（主界面）
@api_view(['GET'])
def person_list(request,personId=None):
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
        
    
#显示人员列表（单个项目界面）
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
                    'permail': person.MAIL_Person,
                    'perrole': person.POS_Person,
                    'perdescription': person.DESC_Person
                }
                persons_data.append(person_data)
            
            return JsonResponse(persons_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)


#统计各职位人员数量（总界面+单项目界面）
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
        
        
#删除人员
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
        
        
#从单个项目中移除人员
@api_view(['POST'])
def person_remove(request, project_id=None):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            person_id = data.get('person_id', None)
            
            if project_id is None or person_id is None:
                return JsonResponse({'error': 'Missing required parameters.'}, status=400)
            
            # 将人员的 ID_Project 字段设置为 NULL
            Person.objects.filter(id=person_id, ID_Project=project_id).update(ID_Project=None)
            
            return JsonResponse({'message': 'Persons removed from project successfully.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)
        
        
"""文件管理部分"""
        
#上传文件
@api_view(['POST'])
def file_upload(request, project_id=None):
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            uploaded_file = request.FILES['file']
            
            # 获取文件信息
            file_name, file_extension = os.path.splitext(uploaded_file.name)
            file_size = uploaded_file.size
            file_upload_time = datetime.datetime.now()
            
             # 获取项目实例
            project_instance = Project.objects.get(id=project_id)
            
            #存入数据
            file_instance = File.objects.create(
                FILE=uploaded_file,
                NAME_File=file_name,
                SIZE_File=file_size,
                FORM_File=file_extension,
                UPTIME_File=file_upload_time,
                ID_Project=project_instance  # 使用项目实例进行关联
            )
             # 返回成功响应
            return JsonResponse({'message': 'File uploaded successfully', 'file_id': file_instance.id}, status=201)
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Project not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
        
        
#文件列表显示（所有文件+单个项目）
@api_view(['GET'])
def file_list(request, project_id=None):
    if request.method == 'GET':
        try:
            # 根据项目 ID 进行筛选文件列表
            if project_id:
                files = File.objects.filter(ID_Project=project_id)
            else:
                files = File.objects.all()
            
            # 构造文件信息列表
            files_data = []
            for file in files:
                file_data = {
                    'file_id': file.id,
                    'file_name': file.NAME_File,
                    'file_size': file.SIZE_File,
                    'file_format': file.FORM_File,
                    'upload_time': file.UPTIME_File.strftime('%Y-%m-%d %H:%M:%S')
                }
                files_data.append(file_data)
            
            return JsonResponse({'files': files_data})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
        
        
#预览文件
@api_view(['GET'])
def file_preview(request, file_id=None):
    if request.method == 'GET':
        try:
            file_obj = File.objects.get(id=file_id)
            
            # 获取文件路径
            file_path = file_obj.FILE.path
             # 生成文件的完整 URL
            file_url = request.build_absolute_uri(file_obj.FILE.url) 
            # 获取文件扩展名
            file_extension = file_obj.FORM_File
            
            # 读取文件内容
            with default_storage.open(file_path, 'rb') as f:
                file_content = f.read()
            
             # 设置 MIME 类型
            if file_extension == '.docx':
                mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            elif file_extension == '.xlsx':
                mime_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            else:
                mime_type, _ = mimetypes.guess_type(file_path)
                if mime_type is None:
                    mime_type = 'application/octet-stream'  # 设置默认 MIME 类型

            # 构造响应
            response = HttpResponse(file_content, content_type=f"{mime_type}; charset=utf-8")
            response['Content-Disposition'] = f'inline; filename="{file_obj.NAME_File}"'

            return response
        except File.DoesNotExist:
            return JsonResponse({'error': '文件不存在'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': '无效的请求'}, status=400)
        
        
#下载文件
@api_view(['GET'])
def file_download(request, file_id=None):
    if request.method == 'GET':
        try:
            file_obj = File.objects.get(id=file_id)
            file_path = file_obj.FILE.path

            # 打开文件
            with open(file_path, 'rb') as f:
                file_content = f.read()

            # 构建 HttpResponse 对象
            response = HttpResponse(file_content, content_type='application/octet-stream; charset=utf-8')
            response['Content-Disposition'] = f'attachment; filename="{smart_str(file_obj.NAME_File)}"'
            response['Content-Length'] = os.path.getsize(file_path)

            return response
        except File.DoesNotExist:
            return JsonResponse({'error': 'File not found'}, status=404)
        except Exception as e:
            # 输出异常信息以便调试
            print(f'Exception: {e}')
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
        
        
#删除文件
@api_view(['POST'])
def file_delete(request):
    if request.method == 'POST':
        try:
            # 从请求中获取要删除的文件的ID
            file_id = request.data.get('file_id')
            
            # 检查文件是否存在
            file_obj = File.objects.get(id=file_id)
            
            # 执行文件删除操作
            file_obj.delete()
            
            # 返回成功的响应
            return JsonResponse({'message': 'File deleted successfully'})
        except File.DoesNotExist:
            # 文件不存在的情况下返回错误响应
            return JsonResponse({'error': 'File not found'}, status=404)
        except Exception as e:
            # 返回内部服务器错误
            return JsonResponse({'error': str(e)}, status=500)
    else:
        # 如果请求不是 POST 方法，则返回无效请求的响应
        return JsonResponse({'error': 'Invalid request method'}, status=400)
        
        
        
        
        
"""质量管理部分"""
        
#添加质检模板和检验项目
@api_view(['POST'])
def qit_item_add(request, project_id):
    if request.method == 'POST':
        # 获取前端传递的数据
        qit_name = request.data.get('qtname')  # 质检模板名称
        items_data = request.data.get('subitems')  # 检验项目数据列表
        
        # 检查是否提供了项目ID、模板名称和项目数据
        if not project_id or not qit_name or not items_data:
            return Response({'error': 'Project ID, template name, or items data is missing'}, status=400)
        
        try:
            # 检查项目是否存在
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({'error': 'Project does not exist'}, status=404)
        
        try:
            # 创建质检模板
            qit = QualityInspectionTemplate.objects.create(NAME_Qit=qit_name, ID_Project=project)
            
            # 创建检验项目
            for item_data in items_data:
                item_name = item_data.get('name')
                item_value = item_data.get('requirement')
                InspectionItem.objects.create(NAME_Item=item_name, VALUE_Item=item_value, ID_Qit=qit)
            
            return Response({'message': 'Template and items added successfully', 'qit_id': qit.id}, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
        
        
#删除质检模板
@api_view(['POST'])
def qit_delete(request):
    if request.method == 'POST':
        qit_id = request.data.get('qit_id')  # 从前端获取质检模板id
        try:
            qit = QualityInspectionTemplate.objects.get(id=qit_id)  # 获取要删除的质检模板对象
        except QualityInspectionTemplate.DoesNotExist:
            return Response({'error': 'Quality Inspection Template does not exist'}, status=404)

        # 执行删除操作
        try:
            qit.delete()
            return Response({'message': 'Quality Inspection Template deleted successfully'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
        
        
#显示质检模板列表
@api_view(['GET'])
def qit_list(request, project_id):
    if request.method == 'GET':
        try:
            # 获取符合条件的质检模板对象
            qit_templates = QualityInspectionTemplate.objects.filter(ID_Project=project_id)

            # 构造要返回的数据列表
            qit_data = []
            for qit_template in qit_templates:
                # 获取质检模板名称
                qit_name = qit_template.NAME_Qit

                # 根据质检模板id筛选相关检验项目
                items = InspectionItem.objects.filter(ID_Qit=qit_template.id)

                # 构造检验项目列表
                items_data = [{'id': item.id, 'NAME_Item': item.NAME_Item, 'VALUE_Item': item.VALUE_Item} for item in items]

                # 构造质检模板数据
                qit_template_data = {
                    'id': qit_template.id,
                    'name': qit_name,
                    'items': items_data
                }
                qit_data.append(qit_template_data)

            return JsonResponse({'qit_templates': qit_data}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
        
        
# 添加质检报告
@api_view(['POST'])
def quality_report_add(request, project_id):
    try:
        data = request.data
        
        # 获取项目对象
        project = Project.objects.get(id=project_id)
        
        # 创建质量报告
        report = QualityInspectionReport.objects.create(
            ID_Project=project,
            NAME_Project=data['qrname'],
            PART_Num=data['qrpart'],
            INSPECTOR_Person=data['qrperson'],
            TIME_Construct=data['qrcons_date'],
            TIME_Inspect=data['qrins_date'],
            NUM_Report=data['qrnumber'],
            OPINION_Inspector=data['qrfeedback'],
            STATUS_Inspect=data['qrevaluation']
        )
        
        # 创建检验结果
        for result_data in data['qrsubitems']:
            InspectionResult.objects.create(
                NAME_Item=result_data['name'],
                VALUE_Standard=result_data['requirement'],
                RESULT_Inspect=result_data['result'],
                ID_Report=report
            )
        
        return JsonResponse({'message': 'Quality inspection report created successfully'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
        
        
# 返回所有报告结果
@api_view(['GET'])
def quality_report_detail(request, project_id):
    try:
        # 查询指定项目ID的所有质量检验报告
        reports = QualityInspectionReport.objects.filter(ID_Project=project_id)

        # 构建返回的数据结构
        report_list = []
        for report in reports:
            report_data = {
                'qrname': report.NAME_Project,
                'qrnumber': report.NUM_Report,
                'qrperson': report.INSPECTOR_Person,
                'qrpart': report.PART_Num,
                'qrcons_date': report.TIME_Construct,
                'qrins_date': report.TIME_Inspect,
                'qrfeedback': report.OPINION_Inspector,
                'qrevaluation': report.STATUS_Inspect
            }
            
            report_list.append(report_data)
        
        return Response(report_list, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
        
        
#统计各季度质检报告情况
@api_view(['GET'])
def quality_report_stats(request, project_id):
    try:
        # 初始化统计数据
        stats = {
            '合格': [0, 0, 0, 0],
            '一般质量问题': [0, 0, 0, 0],
            '重大质量问题': [0, 0, 0, 0]
        }

        # 查询数据并按季度统计
        report_stats = QualityInspectionReport.objects.filter(ID_Project=project_id).annotate(quarter=ExtractQuarter('TIME_Inspect')).values('STATUS_Inspect', 'quarter').annotate(count=Count('STATUS_Inspect'))

        # 填充统计数据
        for stat in report_stats:
            status = stat['STATUS_Inspect']
            quarter = stat['quarter']
            count = stat['count']
            if status in stats:
                stats[status][quarter - 1] = count

        return Response(stats, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
        
        
        
"""安全管理部分"""
        
# 显示安全检查模板列表
@api_view(['GET'])
def sct_list(request, project_id):
    if request.method == 'GET':
        try:
            # 获取符合条件的安全检查模板对象
            sct_templates = SecurityCheckTemplate.objects.filter(ID_Project=project_id)

            # 构造要返回的数据列表
            sct_data = []
            for sct_template in sct_templates:
                # 获取安全检查模板名称
                sct_name = sct_template.NAME_Sct

                # 根据安全检查模板id筛选相关安全检查项目
                items = SecurityCheckItem.objects.filter(ID_Sct=sct_template.id)

                # 构造安全检查项目列表
                items_data = [{'id': item.id, 'name': item.NAME_Item, 'value': item.VALUE_Item} for item in items]

                # 构造安全检查模板数据
                sct_template_data = {
                    'id': sct_template.id,
                    'name': sct_name,
                    'items': items_data
                }
                sct_data.append(sct_template_data)

            return JsonResponse({'sct_templates': sct_data}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
        
        
# 添加安全检查模板和安全检查项目
@api_view(['POST'])
def sct_item_add(request, project_id):
    if request.method == 'POST':
        # 获取前端传递的数据
        template_name = request.data.get('stname')  # 安全检查模板名称
        items_data = request.data.get('subitems')  # 安全检查项目数据列表
        
        # 检查是否提供了项目ID、模板名称和项目数据
        if not project_id or not template_name or not items_data:
            return Response({'error': 'Project ID, template name, or items data is missing'}, status=400)
        
        try:
            # 检查项目是否存在
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({'error': 'Project does not exist'}, status=404)
        
        try:
            # 创建安全检查模板
            template = SecurityCheckTemplate.objects.create(NAME_Sct=template_name, ID_Project=project)
            
            # 创建安全检查项目
            for item_data in items_data:
                item_name = item_data.get('name')
                item_value = item_data.get('requirement')
                SecurityCheckItem.objects.create(NAME_Item=item_name, VALUE_Item=item_value, ID_Sct=template)
            
            return Response({'message': 'Template and items added successfully', 'template_id': template.id}, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
        
        
# 删除安全检查模板
@api_view(['POST'])
def sct_delete(request):
    if request.method == 'POST':
        template_id = request.data.get('st_id')  # 从前端获取安全检查模板id
        try:
            template = SecurityCheckTemplate.objects.get(id=template_id)  # 获取要删除的安全检查模板对象
        except SecurityCheckTemplate.DoesNotExist:
            return Response({'error': 'Security Check Template does not exist'}, status=404)

        # 执行删除操作
        try:
            template.delete()
            return Response({'message': 'Security Check Template deleted successfully'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
        
        
# 显示安检信息
@api_view(['GET'])
def sitem_list(request, scr_id):
    if request.method == 'GET':
        try:
            # 根据安全检查模板id筛选相关安全检查项目
            items = SecurityCheckItem.objects.filter(ID_Sct=scr_id)

            # 构造要返回的数据列表
            items_data = []
            for item in items:
                item_data = {
                    'id': item.id,
                    'item_name': item.NAME_Item,
                    'item_value': item.VALUE_Item,
                }
                items_data.append(item_data)

            # 返回数据
            return Response(items_data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Invalid request method'}, status=400)
        
        
#添加安全检查报告
@api_view(['POST'])
def safety_report_add(request, project_id):
    if request.method == 'POST':
        try:
            report_data = request.POST.get('report')
            if not report_data:
                return JsonResponse({'error': 'No report data provided'}, status=400)
            data = json.loads(report_data)  
            images = request.FILES.getlist('images')
            # 获取项目对象
            project = Project.objects.get(id=project_id)
            
            # 解析报告信息
            srname = data.get('srname')
            srnumber = data.get('srnumber')
            srpart = data.get('srpart')
            srperson = data.get('srperson')
            srins_date = data.get('srins_date')
            srevaluation = data.get('srevaluation')
            srfeedback = data.get('srfeedback')
            srsubitems = data.get('srsubitems', [])

            # 创建安全检查报告记录，并将项目ID分配给ID_Project字段
            report = SecurityInspectionReport.objects.create(
                NAME_Project=srname,
                NAME_SafetyOfficer=srperson,
                NUM_Report=srnumber,
                PART_Check=srpart,
                DATE_Check=srins_date,
                FEEDBACK_SafetyOfficer=srfeedback,
                STATUS_Overall=srevaluation,
                ID_Project=project
            )

            # 创建安全检查结果记录
            for item in srsubitems:
                SecurityCheckResult.objects.create(
                    NAME_Item=item['name'],
                    STANDARD_Item=item['requirement'],
                    RESULT_Item=item['result'],
                    ID_Report=report
                )

            # 保存图片附件
            for image in images:
                SecurityInspectionImage.objects.create(
                    image=image,
                    ID_Report=report
                )

            return JsonResponse({'message': 'Security report created successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
        
        
        
#返回安全问题       
@api_view(['GET'])
def safety_report_list(request, project_id):
    if request.method == 'GET':
        try:
            # 过滤出符合条件的安全报告
            filtered_reports = SecurityInspectionReport.objects.filter(
                ID_Project=project_id,  # 筛选指定项目ID
                STATUS_Overall__in=["一般安全问题", "重大安全问题"]
            )

            # 构造返回的数据列表
            reports_data = []
            for report in filtered_reports:
                # 获取安检结果
                inspection_results = SecurityCheckResult.objects.filter(ID_Report=report.id)
                results_data = [{'item': result.NAME_Item, 'requirement': result.STANDARD_Item, 'result': result.RESULT_Item} for result in inspection_results]

                # 获取图片附件
                image_attachments = SecurityInspectionImage.objects.filter(ID_Report=report.id)
                images_data = [{'image_url': image.image.url, 'upload_date': image.DATE_Upload.isoformat()} for image in image_attachments]

                report_data = {
                    'srname': report.NAME_Project,
                    'srperson': report.NAME_SafetyOfficer,
                    'srnumber': report.NUM_Report,
                    'srpart': report.PART_Check,
                    'srins_date': report.DATE_Check,
                    'srfeedback': report.FEEDBACK_SafetyOfficer,
                    'srevaluation': report.STATUS_Overall,
                    'srsubitems': results_data,
                    'image_attachments': images_data,
                    'report_id':report.id,
                }
                reports_data.append(report_data)

            return Response({'filtered_reports': reports_data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
        
        
#添加安检解决方案
@api_view(['POST'])
def add_safety_solution(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            report_id = data.get('issueId')
            solution_date = data.get('res_Date')
            solution_description = data.get('resolution')

            # 检查是否提供了所有必要的数据
            if not report_id or not solution_date or not solution_description:
                return JsonResponse({'error': 'Missing required parameters.'}, status=400)

            # 获取安全报告
            try:
                report = SecurityInspectionReport.objects.get(id=report_id)
            except SecurityInspectionReport.DoesNotExist:
                return JsonResponse({'error': 'Report not found.'}, status=404)

            # 创建安全问题解决方案记录
            solution = SafetyIssueSolution.objects.create(
                ID_Report=report,
                DATE_Solution=solution_date,
                DESCRIPTION_Solution=solution_description
            )

            # 更新安全报告的 STATUS_Overall 字段为 "合格"
            report.STATUS_Overall = "合格"
            report.save()

            return JsonResponse({'message': 'Safety issue solution added successfully.'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=405)
        
        
#返回某报告的解决方案
@api_view(['GET'])
def get_safety_solutions(request, report_id):
    if request.method == 'GET':
        try:
            # 获取指定报告ID的解决方案
            solutions = SafetyIssueSolution.objects.filter(ID_Report=report_id)
            
            # 如果没有找到解决方案，返回404错误
            if not solutions.exists():
                return JsonResponse({'error': 'No solutions found for the given report ID.'}, status=404)
            
            # 构造返回的数据结构
            solutions_data = []
            for solution in solutions:
                solution_data = {
                    'solution_date': solution.DATE_Solution,
                    'solution_description': solution.DESCRIPTION_Solution
                }
                solutions_data.append(solution_data)

            return Response({'solutions': solutions_data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Method not allowed'}, status=405)
        
        

"""成本管理部分"""

#添加成本信息
@api_view(['POST'])
def add_cost_information(request, project_id):
    if request.method == 'POST':
        try:
            data = request.data
            
            # 解析前端发送的数据
            cost_name = data.get('costName')
            date = data.get('date')
            expense_type = data.get('expenseType')
            accountant = data.get('accountant')
            budget_amount = data.get('budgetAmount')
            currency = data.get('currency')
            cost_amount = data.get('costAmount')
            description = data.get('description')
            
            #查找项目
            project = Project.objects.get(id=project_id)
            
            # 创建成本信息记录
            cost_info = CostInformation.objects.create(
                NAME_Cost=cost_name,
                ID_Project=project,
                DATE_Cost=date,
                TYPE_Expense=expense_type,
                NAME_Accountant=accountant,
                BUDGET_Amount=str(budget_amount),
                UNIT_Currency=currency,
                COST_Amount=str(cost_amount),
                DESC_Cost=description
            )
            
            return JsonResponse({'message': 'Cost information added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

#返回所有成本信息
@api_view(['GET'])
def get_cost_information(request, project_id):
    if request.method == 'GET':
        try:
            #查找项目
            project = Project.objects.get(id=project_id)
            
            # 查询指定项目下的所有成本信息
            costs = CostInformation.objects.filter(ID_Project=project)

            # 构建返回的数据结构
            cost_list = []
            for cost in costs:
                cost_data = {
                    'costName': cost.NAME_Cost,
                    'projectName': project.NAME_Project,
                    'date': cost.DATE_Cost,
                    'expenseType': cost.TYPE_Expense,
                    'accountant': cost.NAME_Accountant,
                    'budgetAmount': str(cost.BUDGET_Amount),
                    'currency': cost.UNIT_Currency,
                    'costAmount': str(cost.COST_Amount),
                    'description': cost.DESC_Cost
                }
                cost_list.append(cost_data)

            return JsonResponse({'costs': cost_list}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

#删除成本信息
@api_view(['GET'])
def delete_cost_information(request, cost_id):
    if request.method == 'POST':
        try:
            # 根据成本信息的id删除对应记录
            cost = CostInformation.objects.get(id=cost_id)
            cost.delete()
            return JsonResponse({'message': 'Cost information deleted successfully'}, status=204)
        except CostInformation.DoesNotExist:
            return JsonResponse({'error': 'Cost information does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
        
        
#统计预算与执行成本
@api_view(['GET'])
def project_cost_summary(request, project_id):
    try:
        # 获取指定项目的所有成本信息
        cost_items = CostInformation.objects.filter(ID_Project_id=project_id)
        
        # 定义费用类型
        expense_types = ['材料费用', '设备费用', '人工费用', '管理费用', '规费税金', '其他费用']
        
        # 初始化结果字典
        result = {
            'TotalBudget': 0,
            'TotalCost': 0,
            'detail': {}
        }
        for expense_type in expense_types:
            result['detail'][expense_type] = {
                'totalbudget': 0,
                'totalcost': 0
            }
        
         # 按费用类型分组汇总预算费用和成本费用
        for expense_type in expense_types:
            budget_summary = cost_items.filter(TYPE_Expense=expense_type) \
                                       .aggregate(total_budget_amount=Sum('BUDGET_Amount'))
            cost_summary = cost_items.filter(TYPE_Expense=expense_type) \
                                     .aggregate(total_cost_amount=Sum('COST_Amount'))
            
            result['detail'][expense_type]['totalbudget'] = budget_summary['total_budget_amount'] or 0
            result['detail'][expense_type]['totalcost'] = cost_summary['total_cost_amount'] or 0

            # 累加总预算费用和总执行费用
            result['TotalBudget'] += result['detail'][expense_type]['totalbudget']
            result['TotalCost'] += result['detail'][expense_type]['totalcost']

        return JsonResponse(result, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
        
        
#按月统计实际成本
@api_view(['GET'])
def project_monthly_cost_summary(request, project_id):
    try:
        # 获取指定项目的所有成本信息
        cost_items = CostInformation.objects.filter(ID_Project_id=project_id)
      
        # 定义费用类型
        expense_types = ['材料费用', '设备费用', '人工费用', '管理费用', '规费税金', '其他费用']
        
        # 初始化每月成本信息的字典
        monthly_costs = {}

        # 按月份和费用类型分组汇总预算费用和成本费用
        for expense_type in expense_types:
            monthly_data = cost_items.filter(TYPE_Expense=expense_type) \
                                     .annotate(month=TruncMonth('DATE_Cost')) \
                                     .values('month') \
                                     .annotate(
                                         total_cost_amount=Sum('COST_Amount')) \
                                     .values('month', 'total_cost_amount')

            for data in monthly_data:
                month = data['month'].strftime('%Y-%m')
                if month not in monthly_costs:
                    monthly_costs[month] = {et: 0 for et in expense_types}
                monthly_costs[month][expense_type] = data['total_cost_amount']
                
         # 将结果转化为数组形式
        result = [
            {
                'month': month,
                'material': costs['材料费用'],
                'equipment': costs['设备费用'],
                'labour': costs['人工费用'],
                'manage': costs['管理费用'],
                'tax': costs['规费税金'],
                'other': costs['其他费用']
            }
            for month, costs in monthly_costs.items()
        ]
        
        return Response(result, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)