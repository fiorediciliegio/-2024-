import * as React from "react";
import { Box, TextField } from "@material-ui/core";

export default function SearchBox({ label }) {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField fullWidth label={label} id="search" />
    </Box>
  );
}
