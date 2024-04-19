import React, { useState, useEffect } from "react";
import { Grid,Box } from "@mui/material";
import moment from "moment";
import { DatePicker } from 'antd';

export default function TimePicker({ label, value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(
    value ? moment(value) : null,
  );

  useEffect(() => {
    setSelectedDate(value ? moment(value) : null);
  }, [value]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    onChange(dateString);
  };

  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item container>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <label>{label}</label>
        </Box>
      </Grid>
      <Grid item container>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch " },
          }}
          noValidate
          autoComplete="off"
        >      
        <DatePicker  
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Box>
      </Grid>
    </Grid>
  );
}
