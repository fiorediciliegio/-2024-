import React from "react";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import SelectBox from "../components/SelectBox.jsx";
import { Grid } from "@material-ui/core";
import { projectlist } from "../constants/PROJECT_INFO.js";
import InfoDisplay from "../components/InfoDisplay.jsx";
import TimeLineWithAdd from "../components/TimeLineWithAdd.jsx";

export default function PlanPage() {
  return (
    <Grid container spacing={2}>
      {/*顶部导航栏 */}
      <Grid item xs={12}>
        <NavBar></NavBar>
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
        <Grid
          item
          direction="column"
          container
          justifyContent="flex-start"
          alignItems="flex-start"
          xs={5}
          spacing={2}
        >
          {/*选择项目框 */}
          <Grid item>
            <SelectBox label="选择项目" set={projectlist}></SelectBox>
          </Grid>
          {/* 项目信息展示框 */}
          <Grid item>
            <InfoDisplay
              label="项目信息"
              line1="100001"
              line2="项目负责人："
              line3="项目起止日期："
              line4="项目描述："
              line5="项目地址："
            ></InfoDisplay>
          </Grid>
        </Grid>
        <Grid item container xs={5}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <TimeLineWithAdd />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
