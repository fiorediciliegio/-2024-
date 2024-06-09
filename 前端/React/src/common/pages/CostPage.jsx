import React from "react";
import { Grid } from "@mui/material";
import GaugeChart from "../components/GaugeChart.jsx";
import LineChartSt from "../components/LineChartSt.jsx";
import CostTable from "../components/CostTable.jsx";
import CommonPage from "../components/CommonPage.jsx";
import useProjectParams from "../hooks/useProjectParams.js"; 

export default function CostPage() {
  const { projectName, projectId } = useProjectParams();

  return (
    <CommonPage
      pageName={"成本控制"} 
      projectId={projectId}
      projectName={projectName}>
        <Grid item container xs={7} direction="column" spacing={2}>
          <Grid item>
            <CostTable projectId={projectId} projectName={projectName}/></Grid>
          <Grid item marginTop={2}>
            <LineChartSt projectId={projectId}/></Grid>
        </Grid>
        <Grid item container xs={5} >
          <GaugeChart projectId={projectId}/>
        </Grid>
    </CommonPage>
  );
}


