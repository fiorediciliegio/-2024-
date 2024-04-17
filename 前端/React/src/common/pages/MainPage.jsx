import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchBox from "../components/SearchBox.jsx";
import OpenButton from "../components/OpenButton.jsx";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import CreatePj from "./CreatePj.jsx";

function MainPage() {
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
        <NavBar></NavBar>
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
        <Grid item container xs={10}>
          {/* 搜索框 还没写搜索功能 */}
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <SearchBox label="Search Project..."></SearchBox>
          </Grid>
          {/* 新建项目按钮 */}
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={2}
          >
            <OpenButton onClick={openCreatePj} children="新建项目"></OpenButton>
            {isCreatePjOpen && <CreatePj onClose={closeCreatePj} />}
          </Grid>
          {/* 数据表格 待写*/}
          <Grid item xs={12}>
            <></>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MainPage;
