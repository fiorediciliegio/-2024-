import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import NavBarRO from "../components/NavBarRO.jsx";
import SideBar from "../components/SideBar.jsx";
import Axios from "axios";
import { useSearchParams,useNavigate } from "react-router-dom";

export default function CostPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [costInfo, setCostInfo] = useState(null);

  const handleSelectProject = async (project) => {
    try {
      const response = await Axios.get(`http://47.123.7.53:8000/show_cost/${project}/`);
      setCostInfo(response.data.projects_data);
       // 更新路由参数
       navigate(`?projectName=${project}`);
    } catch (error) {
      console.error("Error fetching cost:", error);
    }
  };
  
  useEffect(() => {
    if (projectName) {
      // 如果路由参数中存在项目名称，则调用 handleSelectProject 获取项目信息
      handleSelectProject(projectName);
    }
  }, [projectName]); // 仅在 projectName 发生变化时执行 useEffect

  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarRO
              title="ManageYourProject--成本控制"
              projectName={projectName}
            />
      </Grid>
      <Grid item container spacing={2}>
        {/* 侧边栏 */}
        <Grid
          item
          container
          justifyContent="center"
          alignItems="flex-start"
          xs={2}
        >
          <SideBar projectName={projectName} projectId={projectId}></SideBar>
        </Grid>
        <Grid item container xs={10}>
          <></>
        </Grid>
      </Grid>
    </Grid>
  );
}
