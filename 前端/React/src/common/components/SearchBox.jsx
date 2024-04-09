import * as React from "react";
import { Box, TextField } from "@material-ui/core";

export default function SearchBox() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField fullWidth label="Search..." id="search" />
    </Box>
  );
}
