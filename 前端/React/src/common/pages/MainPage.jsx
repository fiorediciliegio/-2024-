import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import OpenButton from "../components/OpenButton.jsx";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import CreatePj from "./CreatePj.jsx";
import ProjectTable from "../components/ProjectTable.jsx";

export default function MainPage() {
  const navigate = useNavigate();
  const handleRowClick = (url) => {
    navigate(url);
  };
  //管理弹窗
  const [isCreatePjOpen, setIsCreatePjOpen] = useState(false);
  const openCreatePj = () => {
    setIsCreatePjOpen(true);
  };
  const closeCreatePj = () => {
    setIsCreatePjOpen(false);
  };
  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBar title="ManageYourProject"></NavBar>
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
          <SideBar></SideBar>
        </Grid>
        <Grid item container xs={10} spacing={2} justifyContent="flex-end" alignItems="center">
          {/* 新建项目按钮 */}
          <Grid item  sx={{ marginRight: '100px' }}>
            <OpenButton onClick={openCreatePj} children="新建项目"></OpenButton>
            {isCreatePjOpen && <CreatePj onClose={closeCreatePj} />}
          </Grid>
          {/* 数据表格 */}
          <Grid item xs={12}>
            <ProjectTable onRowClick={handleRowClick}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
