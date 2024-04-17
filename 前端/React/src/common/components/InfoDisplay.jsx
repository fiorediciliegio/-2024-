import * as React from "react";
import { Box, Paper } from "@material-ui/core";

export default function InfoDisplay({
  label,
  line1,
  line2,
  line3,
  line4,
  line5,
}) {
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
        <h4>{label}</h4>
        <p>{line1}</p>
        <p>{line2}</p>
        <p>{line3}</p>
        <p>{line4}</p>
        <p>{line5}</p>
      </Paper>
    </Box>
  );
}
