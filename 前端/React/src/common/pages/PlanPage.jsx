import React from "react";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import { Grid } from "@mui/material";
import InfoDisplay from "../components/InfoDisplay.jsx";
import TimeLineWithAdd from "../components/TimeLineWithAdd.jsx";
import PieChart from "../components/PieChart.jsx"

export default function PlanPage() {
  return (
    <Grid container spacing={2} >
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBar title="ManageYourProject--项目规划"/>
      </Grid>
      {/* 主要内容 */}
      <Grid item container spacing={2}>
        {/* 第一列：侧边栏 */}
        <Grid 
        item
        container
        justifyContent="center"
        alignItems="flex-start"
        xs={2}>
          <SideBar/>
        </Grid>
        {/* 第二列：信息展示框和图表 */}
        <Grid item container xs={7} direction="column" spacing={2} >
           {/* 图表 */}
          <Grid item container justifyContent="center" alignContent="center">
            <PieChart/>
          </Grid>
            {/* 项目信息展示框 */}
          <Grid item>
            <InfoDisplay
              label="项目信息"
              line1="100001"
              line2="项目负责人："
              line3="项目起止日期："
              line4="项目地址："
            />
          </Grid>
        </Grid>
        {/* 第三列：时间轴 */}
        <Grid item xs={3}>
          <TimeLineWithAdd /> 
        </Grid>
      </Grid>
    </Grid>
  );
}
