import React from "react";
import { Grid } from "@mui/material";
import NavBarWithSelect from "../components/NavBarWithSelect.jsx";
import SideBar from "../components/SideBar.jsx";

export default function QualityPage() {
  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarWithSelect title="ManageYourProject--质量监测"/>
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
          <></>
        </Grid>
      </Grid>
    </Grid>
  );
}
