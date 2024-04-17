import * as React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioSelect({ label, value1, value2, value3 }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={value1} control={<Radio />} label={value1} />
        <FormControlLabel value={value2} control={<Radio />} label={value2} />
        <FormControlLabel value={value3} control={<Radio />} label={value3} />
      </RadioGroup>
    </FormControl>
  );
}
