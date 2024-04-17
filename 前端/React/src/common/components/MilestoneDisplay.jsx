import * as React from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import TimePicker from "../components/TimePicker.jsx";
import RadioSelect from "../components/RadioSelect.jsx";

export default function MilestoneDisplay() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <Paper style={{ width: "100%", height: "100%", padding: "20px" }}>
        <h3>节点事件1</h3>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TimePicker label="节点截止日期"></TimePicker>
          </Grid>
          <Grid item>
            <RadioSelect
              label="节点状态"
              value1="未完成"
              value2="进行中"
              value3="已完成"
            ></RadioSelect>
          </Grid>
          <Grid item>
            <p>节点描述：</p>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
