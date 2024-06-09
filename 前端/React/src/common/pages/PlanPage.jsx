import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Grid } from "@mui/material";
import InfoDisplay from "../components/InfoDisplay.jsx";
import TimeLineWithAdd from "../components/TimeLineWithAdd.jsx";
import BasicPie from "../components/PieChart.jsx";
import CommonPage from "../components/CommonPage.jsx";
import useProjectParams from "../hooks/useProjectParams.js"; 


export default function PlanPage() {
  //获取项目信息
  const navigate = useNavigate();
  const { projectName, projectId } = useProjectParams();
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
  }, [projectName, projectId]); 

  return (
    <CommonPage
      pageName={"项目规划"} 
      projectId={projectId}
      projectName={projectName}>
           {/* 图表 */}
          <Grid item container direction="column" xs={7}>
            <Grid item container justifyContent="center" alignContent="center">
              <BasicPie pjID={projectId}/></Grid>
            <Grid item>
             <InfoDisplay
              line1={`项目编号： ${selectedProjectInfo ? selectedProjectInfo.pjnumber : ""}`}
              line2={`负责人： ${selectedProjectInfo ? selectedProjectInfo.pjmanager : ""}`}
              line3={`项目价值： ${selectedProjectInfo ? selectedProjectInfo.pjvalue + " " + selectedProjectInfo.pjcurrency : ""}`}
              line4={`项目起止日期： ${selectedProjectInfo ? selectedProjectInfo.pjstart_date + " 至 " + selectedProjectInfo.pjend_date : ""}`}
              line5={`项目地址： ${selectedProjectInfo ? selectedProjectInfo.pjaddress : ""}`}
              line6={`项目描述： ${selectedProjectInfo ? selectedProjectInfo.pjdescription : ""}`}
            /></Grid>
          </Grid>
        {/* 时间轴 */}
          <Grid item container xs={5} alignItems="flex-start" direction="column">
            <p>节点时间轴：</p>
            <Grid item>
            <TimeLineWithAdd pjID={projectId}/></Grid>
          </Grid>
      </CommonPage>
  );
}
        