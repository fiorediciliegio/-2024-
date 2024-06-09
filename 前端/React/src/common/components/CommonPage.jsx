import React from "react";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar.jsx";
import NavBarRO from "../components/NavBarRO.jsx";


export default function CommonPage({pageName, projectName,projectId,children}) {
  return (
    <Grid container spacing={2}>
      {/*顶部导航栏 */}
      <Grid item xs={12}>
          <NavBarRO
            title={`ManageYourProject--${pageName}`}
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
        <Grid item container xs={10} spacing={2} mariginTop={2}>
            {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
