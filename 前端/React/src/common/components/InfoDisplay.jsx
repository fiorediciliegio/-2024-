import * as React from "react";
import { Box, Paper } from "@material-ui/core";

export default function InfoDisplay() {
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
        <h3>项目信息</h3>
        <p>项目编号</p>
        <p>项目类型</p>
        <p>项目负责人</p>
        <p>开始与结束日期</p>
        <p>项目地址</p>
      </Paper>
    </Box>
  );
}
