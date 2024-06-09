import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import OpenButton from "../components/OpenButton.jsx";
import NavBar from "../components/NavBar.jsx";
import CreatePerson from "../popups/CreatePerson.jsx";
import CreatePj from "../popups/CreatePj.jsx";
import ProjectTable from "../components/ProjectTable.jsx";
import PersonTable from "../components/PersonTable.jsx";

export default function MainPage() {
  const navigate = useNavigate();
  const handleRowClick = (url) => {
    navigate(url);
  };
  //管理新建项目弹窗
  const [isCreatePjOpen, setIsCreatePjOpen] = useState(false);
  const openCreatePj = () => {
    setIsCreatePjOpen(true);
  };
  const closeCreatePj = () => {
    setIsCreatePjOpen(false);
  };
    //管理新建人员弹窗
  const [isCreatePersonOpen, setIsCreatePersonOpen] = useState(false);
  const openCreatePerson = () => {
    setIsCreatePersonOpen(true);
  };
  const closeCreatePerson = () => {
    setIsCreatePersonOpen(false);
  };
  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12} spacing={2}>
        <NavBar title="ManageYourProject"></NavBar>
      </Grid>
      {/*主体*/}
      <Grid item container spacing={2} margin={1}>
        <Grid item container xs={9} spacing={2} justifyContent="flex-end" alignItems="center">        
          {/* 项目表格 */}
          <Grid item xs={12}>
            <ProjectTable onRowClick={handleRowClick}/>
          </Grid>
          {/*人员表格 */}
          <Grid item xs={12}>
            <PersonTable />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={"column"}
          spacing={2}
          xs={3}
        >
          {/* 新建项目按钮 */}  
          <Grid item  sx={{ marginRight: '100px' }}>
            <OpenButton onClick={openCreatePj} children="新建项目"></OpenButton>
            {isCreatePjOpen && <CreatePj onClose={closeCreatePj} />}
          </Grid>
           {/* 添加人员按钮 */}
           <Grid item  sx={{ marginRight: '100px' }}>
            <OpenButton onClick={openCreatePerson} children="添加人员"></OpenButton>
            {isCreatePersonOpen && <CreatePerson onClose={closeCreatePerson} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
