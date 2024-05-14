import React from "react";
import { useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import NavBarRO from "../components/NavBarRO.jsx";
import SideBar from "../components/SideBar.jsx";
import FileManager from "../components/FileManager.jsx";


export default function DocumentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarRO title="ManageYourProject--文档" projectName={projectName}/>
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
          <FileManager projectId={projectId}/>
        </Grid>
      </Grid>
    </Grid>
  );
}
