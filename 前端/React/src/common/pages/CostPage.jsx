import React from "react";
import { useSearchParams} from "react-router-dom";
import { Grid } from "@mui/material";
import NavBarRO from "../components/NavBarRO.jsx";
import SideBar from "../components/SideBar.jsx";
import GaugeChart from "../components/GaugeChart.jsx";
import LineChartSt from "../components/LineChartSt.jsx";


export default function CostPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");


  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarRO
              title="ManageYourProject--成本控制"
              projectName={projectName}
            />
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
          <Grid item container xs={5}>
              <GaugeChart/>
          </Grid>
          <Grid item container xs={7} >
            <LineChartSt/>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
