import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar.jsx";
import NavBarRO from "../components/NavBarRO.jsx";
import PersonList from "../components/PersonList4Pj.jsx";
import BasicBar from "../components/BarChartH.jsx";
import ChipSelectBox from "../components/ChipSelectBox.jsx";
import Axios from "axios";
import { useSearchParams,useNavigate } from "react-router-dom";

export default function PersonnelPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [pjPerInfo, setPjPerInfo] = useState(null);

  const handleSelectProject = async (project) => {
    try {
      const response = await Axios.get(`http://47.123.7.53:8000/show_PersoninPj/${project}/`);
      setPjPerInfo(response.data.projects_data);
       // 更新路由参数
       navigate(`?projectName=${project}`);
    } catch (error) {
      console.error("Error fetching person in project:", error);
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
      {/*顶部导航栏 */}
      <Grid item xs={12}>
          <NavBarRO
            title="ManageYourProject--人力资源"
            projectName={projectName}
          />
      </Grid>
      <Grid item container spacing={2}>
        {/*侧边栏 */}
        <Grid
          item
          container
          justifyContent="center"
          alignItems="flex-start"
          xs={2}
        >
          <SideBar projectName={projectName} projectId={projectId}/>
        </Grid>
        {/*主要区域 */}
        <Grid item container xs={10} spacing={2} direction="column">
          {/*第一行 */}
          <Grid item container spacing={2}>
            {/*现有人员列表 */}
            <Grid item container xs={5} spacing={2} justifyContent="flex-start" alignItems="center">
              <PersonList projectId={projectId}/>
            </Grid>
            {/*柱状图 */}
            <Grid item container xs={7} spacing={2} justifyContent="flex-start" alignItems="center">
              <BasicBar/>
            </Grid>
          </Grid>
          {/*第二行 */}
          <Grid item container marginTop ={4} >
            {/*向项目中添加人员 */}
            <Grid item container xs={12} spacing={2} justifyContent="flex-start" alignItems="center">
              <ChipSelectBox projectId={projectId}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
