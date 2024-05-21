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
# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

urlpatterns = [
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

    #上传文件
    path('document/upload/<int:project_id>/', views.file_upload),

    #展示所有文件列表（可以不用）
    path('file/list/', views.file_list),

    #展示单个项目文件列表
    path('file/project/list/<int:project_id>/', views.file_list),

    #预览文件
    path('file/preview/', views.file_preview),

    #下载文件
    path('file/download/', views.file_download),
]

