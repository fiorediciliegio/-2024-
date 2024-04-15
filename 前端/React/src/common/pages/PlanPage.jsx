import React from "react";
import SideBar from "../components/SideBar.jsx";
import NavBar from "../components/NavBar.jsx";
import MilestoneLine from "../components/MilestoneLine.jsx";
import { Grid } from "@material-ui/core";

export default function PlanPage() {
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item container spacing={2}>
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
