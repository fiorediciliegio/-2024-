import React from "react";
import { useSearchParams} from "react-router-dom";
import { Grid } from "@mui/material";
import SideBar from "../components/SideBar.jsx";
import NavBarRO from "../components/NavBarRO.jsx";
import PersonList from "../components/PersonList4Pj.jsx";
import BasicBarH from "../components/BarChartH.jsx";
import ChipSelectBox from "../components/ChipSelectBox.jsx";


export default function PersonnelPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");


  return (
    <Grid container spacing={2}>
      {/*顶部导航栏 */}
      <Grid item xs={12}>
          <NavBarRO
            title="ManageYourProject--人力资源"
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
        <Grid item container xs={10} spacing={2} direction="column">
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
        </Grid>
      </Grid>
    </Grid>
  );
}
