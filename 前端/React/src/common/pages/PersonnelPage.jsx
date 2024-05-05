import React, { useState } from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar.jsx";
import NavBarWithSelect from "../components/NavBarWithSelect.jsx";
import OpenButton from "../components/OpenButton.jsx";
import CreatePerson from "../pages/CreatePerson.jsx";
import PersonTable from "../components/PersonTable.jsx"

export default function PersonnelPage() {
  const [isCreatePersonOpen, setIsCreatePersonOpen] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState(""); // 新增状态来存储所选项目的名称
  
  const openCreatePerson = () => {
    setIsCreatePersonOpen(true);
  };
  const closeCreatePerson = () => {
    setIsCreatePersonOpen(false);
  };
  const handleProjectSelect = (projectName) => {
    setSelectedProjectName(projectName); // 更新所选项目的名称
  };

  return (
    <Grid container spacing={2}>
      {/*顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarWithSelect title="ManageYourProject--人力资源" onSelectProject={handleProjectSelect}/>
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
          <SideBar></SideBar>
        </Grid>
        <Grid item container xs={10} spacing={2} justifyContent="flex-end" alignItems="center">
          {/* 添加人员按钮 */}
          <Grid item  sx={{ marginRight: '100px' }}>
            <OpenButton
              onClick={openCreatePerson}
              children="添加人员"
            ></OpenButton>
            {isCreatePersonOpen && <CreatePerson onClose={closeCreatePerson} projectName={selectedProjectName}/>}
          </Grid>
           {/* 数据表格 */}
           <Grid item xs={12}>
            <PersonTable/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
