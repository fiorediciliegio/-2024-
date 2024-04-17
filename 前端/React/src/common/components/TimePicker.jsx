import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from "@material-ui/core";
import moment from "moment";

export default function TimePicker({ label, value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null,
  );

  useEffect(() => {
    setSelectedDate(value ? new Date(value) : null);
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date ? moment(date).format("YYYY-MM-DD") : "");
  };

  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item>
        <label>{label}</label>
      </Grid>
      <Grid item>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
        />
      </Grid>
    </Grid>
  );
}
