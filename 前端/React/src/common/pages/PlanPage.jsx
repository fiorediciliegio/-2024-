import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar.jsx";
import NavBarWithSelect from "../components/NavBarWithSelect.jsx";
import InfoDisplay from "../components/InfoDisplay.jsx";
import TimeLineWithAdd from "../components/TimeLineWithAdd.jsx";
import BasicPie from "../components/PieChart.jsx";
import useProjectParams from "../hooks/useProjectParams.js"; 
import { useAuth } from '../hooks/AuthContext';

export default function PlanPage() {
  const { user } = useAuth();
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const { projectName, projectId } = useProjectParams();
  const [selectedProjectInfo, setSelectedProjectInfo] = useState(null);
  const basicPieRef = useRef(null); // 创建 BasicPie 组件的 ref

  const handleSelectProject = async (projectName, projectId) => {
    try {
      const response = await Axios.get(`http://47.123.7.53:8000/project/detail/${projectId}/`);
      setSelectedProjectInfo(response.data.projects_data);
      navigate(`?projectName=${projectName}&projectId=${projectId}`);
    } catch (error) {
      console.error("Error fetching project information:", error);
    }
  };

  useEffect(() => {
      handleSelectProject(projectName, projectId);
  }, [projectName, projectId]); // 仅在 projectName 发生变化时执行 useEffect

  const handleTimelineUpdate = () => {
    if (basicPieRef.current) {
      basicPieRef.current.refreshData(); // 通过 ref 调用 BasicPie 组件内部的 fetchData 函数
    }
  };

  return (
    <Grid container spacing={2} >
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
         {/* 通过 onSelectProject 属性将选择事件传递给 NavBarWithSelect */}
          <NavBarWithSelect
            title="ManageYourProject--项目规划"
            defaultSelectedProject={projectId}
            onSelectProject={handleSelectProject}
            user={user} 
            onLogout={logout}
          />
      </Grid>
      {/* 主要内容 */}
      <Grid item container xs={12} spacing={2}>
        {/* 第一列：侧边栏 */}
        <Grid 
          item
          container
          justifyContent="center"
          alignItems="flex-start"
          xs={2}>
          <SideBar projectName={projectName} projectId={projectId}/>
        </Grid>
        {/* 第二列：信息展示框和图表 */}
        <Grid item container xs={6} direction="column" spacing={2} >
           {/* 图表 */}
          <Grid item container justifyContent="center" alignContent="center">
          <BasicPie pjID={projectId}  ref={basicPieRef}/>
          </Grid>
            {/* 项目信息展示框 */}
          <Grid item>
             {/* 使用 selectedProjectInfo 来展示项目信息 */}
             <InfoDisplay
              line1={`项目编号： ${selectedProjectInfo ? selectedProjectInfo.pjnumber : ""}`}
              line2={`负责人： ${selectedProjectInfo ? selectedProjectInfo.pjmanager : ""}`}
              line3={`项目价值： ${selectedProjectInfo ? selectedProjectInfo.pjvalue + " " + selectedProjectInfo.pjcurrency : ""}`}
              line4={`项目起止日期： ${selectedProjectInfo ? selectedProjectInfo.pjstart_date + " 至 " + selectedProjectInfo.pjend_date : ""}`}
              line5={`项目地址： ${selectedProjectInfo ? selectedProjectInfo.pjaddress : ""}`}
              line6={`项目描述： ${selectedProjectInfo ? selectedProjectInfo.pjdescription : ""}`}
            />
          </Grid>
        </Grid>
        {/* 第三列：时间轴 */}
        <Grid item container xs={4} alignItems="flex-start" direction="column">
          <p>节点时间轴：</p>
          <Grid item>
            <TimeLineWithAdd pjID={projectId} onTimelineUpdate={handleTimelineUpdate} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}