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


    #项目列表显示
    path('show_projects/<str:project>/', views.project_list, name='show_projects_detail'),


    #增加项目
    path('project/add/', views.project_add),


    #删除项目
    path('project/delete/', views.project_delete),


    #项目节点显示
    path('projectnode/list/', views.projectnode_list),


    #添加项目节点
    path('projectnode/add/', views.projectnode_add),


    #删除项目节点
    path('projectnode/delete/', views.projectnode_delete),


    path('test/', views.test),

    path('project/edit/', views.project_edit),
    
    path('create_project/', views.project_add),
]
