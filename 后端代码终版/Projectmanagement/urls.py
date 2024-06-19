"""
URL configuration for Projectmanagement project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app01 import views
from app01.views import project_add
from django.conf import settings
# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

urlpatterns = [
    #登录
    path('login/', views.login_view, name='login'),
    
        #——————项目管理部分——————
    
    #添加项目
    path('project/add/', views.project_add),
    
    #项目列表显示
    path('project/list/', views.project_list),
    
    #单个项目信息显示
    path('project/detail/<int:projectId>/', views.project_list, name='show_project_detail'),

    #删除项目
    path('project/delete/', views.project_delete),
    
    #项目节点显示
    path('projectnode/list/<int:project_id>/', views.projectnode_list),
    
    #添加项目节点
    path('projectnode/add/', views.projectnode_add),
    
    #删除项目节点
    path('projectnode/delete/', views.projectnode_delete),
    
    #统计项目节点状态
    path('projectnode/collect/<int:project_id>/', views.projectnode_collect),
    
    #更新项目节点状态
    path('projectnode/update/phen/<int:node_id>/', views.projectnode_update_phen),
    
    
    
        #——————人员管理部分——————
    
    #添加人员（总项目界面+单个项目界面）
    path('person/add/', views.person_add),
    path('person/add/project/<int:project_id>/', views.person_add_project),

    #人员列表显示
    path('person/list/', views.person_list),
    
    #人员列表显示（单个项目界面）
    path('person/project/list/<int:project_id>/', views.person_project_list),
    
    #单个人员人员信息显示
    path('person/detail/<int:personId>/', views.person_list),
    
    #人员职位统计（总界面）
    path('person/collect/', views.person_collect),
    
    #人员职位统计（单个项目界面）
    path('person/project/collect/<int:project_id>/', views.person_collect),
    
    #删除人员
    path('person/delete/', views.person_delete),
    
    #从单个项目中移除人员
    path('person/remove/<int:project_id>/', views.person_remove),
    
        #——————文件管理部分——————
    
    #上传文件
    path('file/upload/<int:project_id>/', views.file_upload),
    
    #展示所有文件列表（可以不用）
    path('file/list/', views.file_list),
    
    #展示单个项目文件列表
    path('file/project/list/<int:project_id>/', views.file_list),
    
    #预览文件
    path('file/preview/<int:file_id>/', views.file_preview),
    
    #下载文件
    path('file/download/<int:file_id>/', views.file_download),
    
    #删除文件
    path('file/delete/', views.file_delete),
    
    
    
        #——————质量管理部分——————
    
    #添加质检模板
    path('quality/template/add/<int:project_id>/', views.qit_item_add),
    
    #删除质检模板
    path('quality/template/delete/', views.qit_delete),
    
    #显示质检模板列表
    path('quality/template/list/<int:project_id>/', views.qit_list),
    
    #添加质检报告
    path('quality/report/add/<int:project_id>/', views.quality_report_add),
    
    #获取所有质检报告信息
    path('quality/report/list/<int:project_id>/', views.quality_report_detail),
    
        #统计各季度质检报告情况
    path('quality/collect/<int:project_id>/', views.quality_report_stats, name='quality_report_stats'),
    
    
    
        #——————安全管理部分——————
    
    #添加安检模板
    path('safety/template/add/<int:project_id>/', views.sct_item_add),
    
    #删除安检模板
    path('safety/template/delete/', views.sct_delete),
    
    #显示安检模板列表
    path('safety/template/list/<int:project_id>/', views.sct_list),
    
    #添加安全报告
    path('safety/report/add/<int:project_id>/', views.safety_report_add),
    
    #获取有安全问题的安全报告信息
    path('safety/issue/list/<int:project_id>/', views.safety_report_list),
    
    #添加解决方案
    path('safety/issue/resolve/', views.add_safety_solution, name='add_safety_solution'),
    
    #返回解决方案信息
    path('safety/solution/get/<int:report_id>/', views.get_safety_solutions, name='get_safety_solutions'),
    


        #——————成本管理部分——————
        
    #添加成本信息
    path('cost/add/<int:project_id>/', views.add_cost_information, name='add_cost_information'),
    
    #返回所有成本信息
    path('cost/list/<int:project_id>/', views.get_cost_information, name='get_cost_information'),
    
    #删除成本信息
    path('cost/delete/<int:cost_id>/', views.delete_cost_information, name='delete_cost_information'),
    
    #获取指定项目下的所有成本项目的预算金额与实际成本之和
    path('cost/collect/total/<int:project_id>/', views.project_cost_summary, name='project_cost_summary'),
    
    ##按月统计实际成本
    path('cost/collect/monthly/<int:project_id>/', views.project_monthly_cost_summary, name='project_monthly_cost_summary'),
] 

