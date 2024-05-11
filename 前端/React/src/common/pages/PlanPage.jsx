import React, { useState, useEffect  } from "react";
import SideBar from "../components/SideBar.jsx";
import NavBarWithSelect from "../components/NavBarWithSelect.jsx";
import { Grid } from "@mui/material";
import InfoDisplay from "../components/InfoDisplay.jsx";
import TimeLineWithAdd from "../components/TimeLineWithAdd.jsx";
import BasicPie from "../components/PieChart.jsx";
import Axios from "axios";
import { useSearchParams,useNavigate } from "react-router-dom";

export default function PlanPage() {
  //获取项目信息
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [selectedProjectInfo, setSelectedProjectInfo] = useState(null);

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

  return (
    <Grid container spacing={2} >
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
         {/* 通过 onSelectProject 属性将选择事件传递给 NavBarWithSelect */}
          <NavBarWithSelect
            title="ManageYourProject--项目规划"
            defaultSelectedProject={projectId}
            onSelectProject={handleSelectProject}
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
          <BasicPie pjID={projectId}/>
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
            <TimeLineWithAdd pjID={projectId}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
