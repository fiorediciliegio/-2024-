import * as React from "react";
import { Box, TextField, MenuItem } from "@material-ui/core";

export default function SelectBox({ set, title, value, onChange }) {
  return (
    <Box
      component="form"
      sx={{
        "& .extField-ui-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          select
          label={title}
          value={value}
          onChange={onChange}
          defaultValue={set[0].value}
        >
          {set.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
