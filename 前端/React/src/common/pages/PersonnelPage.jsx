import React from "react";
import { Grid } from "@mui/material";
import PersonList from "../components/PersonList4Pj.jsx";
import BasicBarH from "../components/BarChartH.jsx";
import ChipSelectBox from "../components/ChipSelectBox.jsx";
import CommonPage from "../components/CommonPage.jsx";
import useProjectParams from "../hooks/useProjectParams.js"; 

export default function PersonnelPage() {
  const { projectName, projectId } = useProjectParams();

  return (
    <CommonPage
      pageName={"人力资源"} 
      projectId={projectId}
      projectName={projectName}>
      {/*第一行 */}
      <Grid item container spacing={2}>
            {/*现有人员列表 */}
            <Grid item container xs={5} marginTop={2} justifyContent="flex-start" alignItems="flex-start">
              <PersonList projectId={projectId}/>
            </Grid>
            {/*柱状图 */}
            <Grid item container xs={7} spacing={2} justifyContent="flex-start" alignItems="flex-start">
              <BasicBarH pjID={projectId}/>
            </Grid>
          </Grid>
          {/*第二行 */}
          <Grid item container marginTop ={4} >
            {/*向项目中添加人员 */}
            <Grid item container xs={12} spacing={2} justifyContent="flex-start" alignItems="center">
              <ChipSelectBox projectId={projectId}/>
            </Grid>
          </Grid>
    </CommonPage>   
  );
}
          