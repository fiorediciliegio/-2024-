import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import OpenButton from "../components/OpenButton.jsx";
import NavBar from "../components/NavBar.jsx";
import CreatePerson from "../popups/CreatePerson.jsx";
import CreatePj from "../popups/CreatePj.jsx";
import ProjectTable from "../components/ProjectTable.jsx";
import PersonTable from "../components/PersonTable.jsx";
import { useAuth } from '../hooks/AuthContext';

export default function MainPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } =useAuth(); 
  const handleRowClick = (url) => {
    navigate(url);
  };

  // 使用 useRef 来创建表格组件的引用
  const projectTableRef = useRef(null);
  const personTableRef = useRef(null);

    // 根据用户级别决定按钮的可用性
  const isManager = user && user.level === '管理者'; 

  //管理新建项目弹窗
  const [isCreatePjOpen, setIsCreatePjOpen] = useState(false);
  const openCreatePj = () => {
    setIsCreatePjOpen(true);
  };
  const closeCreatePj = () => {
    setIsCreatePjOpen(false);
    // 在关闭项目弹窗时更新 ProjectTable 的数据
    if (projectTableRef.current) {
      projectTableRef.current.refreshData(); // 假设 refreshData 是 ProjectTable 中的方法
    }
  };
    //管理新建人员弹窗
  const [isCreatePersonOpen, setIsCreatePersonOpen] = useState(false);
  const openCreatePerson = () => {
    setIsCreatePersonOpen(true);
  };
  const closeCreatePerson = () => {
    setIsCreatePersonOpen(false);
     // 在关闭人员弹窗时更新 PersonTable 的数据
     if (personTableRef.current) {
      personTableRef.current.refreshData(); // 假设 refreshData 是 PersonTable 中的方法
    }
  };
  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12} spacing={2}>
        <NavBar title="ManageYourProject" user={user} onLogout={logout}></NavBar>
      </Grid>
      {/*主体*/}
      <Grid item container spacing={2} margin={1}>
        <Grid item container xs={9} spacing={2} justifyContent="flex-end" alignItems="center">        
          {/* 项目表格 */}
          <Grid item xs={12}>
            <ProjectTable  ref={projectTableRef} onRowClick={handleRowClick}/>
          </Grid>
          {/*人员表格 */}
          <Grid item xs={12}>
            <PersonTable ref={personTableRef}/>
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
          {isManager && 
          <Grid item  sx={{ marginRight: '100px' }}>
            <OpenButton onClick={openCreatePj} children="新建项目"></OpenButton>
            {isCreatePjOpen && <CreatePj onClose={closeCreatePj} />}
          </Grid>}
           {/* 添加人员按钮 */}
           {isManager && 
           <Grid item  sx={{ marginRight: '100px' }}>
            <OpenButton onClick={openCreatePerson} children="添加人员"></OpenButton>
            {isCreatePersonOpen && <CreatePerson onClose={closeCreatePerson} />}
          </Grid>}
        </Grid>
      </Grid>
    </Grid>
  );
}
