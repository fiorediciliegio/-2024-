import * as React from "react";
import { Box, Paper } from "@mui/material";
export default function InfoDisplay({
  line1,
  line2,
  line3,
  line4,
}) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "70%",
        height: "100%",
      }}
    >
      <Paper style={{ width: "100%", height: "100%", padding: "15px" }}>
        <p>{line1}</p>
        <p>{line2}</p>
        <p>{line3}</p>
        <p>{line4}</p>
      </Paper>
    </Box>
  );
}
