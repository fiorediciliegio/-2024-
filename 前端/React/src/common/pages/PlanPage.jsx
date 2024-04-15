import React from "react";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import SelectBox from "../components/SelectBox.jsx";
import MilestoneLine from "../components/MilestoneLine.jsx";
import { Grid } from "@material-ui/core";
import { projectlist } from "../constants/PROJECT_INFO.js";
import InfoDisplay from "../components/InfoDisplay.jsx";

const timelineItems = [
  {
    date: "2022-01-01",
    title: "事件标题1",
    description: "事件描述1",
    status: "completed",
  },
  {
    date: "2022-02-15",
    title: "事件标题2",
    description: "事件描述2",
    status: "pending",
  },
  {
    date: "2022-03-30",
    title: "事件标题3",
    description: "事件描述3",
    status: "ongoing",
  },
];

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
        >
          {/*选择项目框 */}
          <Grid item>
            <SelectBox label="选择项目" set={projectlist}></SelectBox>
          </Grid>
          {/* 项目信息展示框 */}
          <Grid item>
            <InfoDisplay></InfoDisplay>
          </Grid>
          {/* 节点展示框 */}
          <Grid item>
            <InfoDisplay></InfoDisplay>
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
            <MilestoneLine items={timelineItems} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
