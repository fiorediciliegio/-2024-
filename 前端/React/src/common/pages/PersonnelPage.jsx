import React, { useState } from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar.jsx";
import NavBarWithSelect from "../components/NavBarWithSelect.jsx";
import SearchBox from "../components/SearchBox.jsx";
import OpenButton from "../components/OpenButton.jsx";
import CreatePerson from "../pages/CreatePerson.jsx";

export default function PlanPage() {
  const [isCreatePersonOpen, setIsCreatePersonOpen] = useState(false);
  const openCreatePerson = () => {
    setIsCreatePersonOpen(true);
  };
  const closeCreatePerson = () => {
    setIsCreatePersonOpen(false);
  };
  return (
    <Grid container spacing={2}>
      {/*顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarWithSelect title="ManageYourProject--人力资源"/>
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
        <Grid item container xs={10}>
          {/* 搜索框 还没写搜索功能 */}
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <SearchBox label="搜索人员..."></SearchBox>
          </Grid>
          {/* 添加人员按钮 */}
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={2}
          >
            <OpenButton
              onClick={openCreatePerson}
              children="添加人员"
            ></OpenButton>
            {isCreatePersonOpen && <CreatePerson onClose={closeCreatePerson} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
