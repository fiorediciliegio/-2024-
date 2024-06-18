import React, { useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import {Box,OutlinedInput,InputLabel, MenuItem, FormControl, Select,Chip, Grid } from '@mui/material';
import axios from 'axios'; 
import SaveButton from '../components/SaveButton.jsx';
import useFetchData from '../hooks/useFetchData.js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChipSelectBox({projectId, onUpdate}) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const { data: people, error, fetchData } = useFetchData(`http://47.123.7.53:8000/person/list/`);
  
  useEffect(() => { 
    fetchData(); 
  }, []);
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  //将人员添加到项目
  const handleSaveClick = () => {
    axios
      .post(`http://47.123.7.53:8000/person/add/project/${projectId}/`, {
        person_ids: personName.map((person) => person.split(':')[3]), 
      })
      .then((res) => {
        console.log("Person added to project successfully:", res.data);
        if (onUpdate) {
          onUpdate();
        };
        //重置选择框
        setPersonName([]);
      })
      .catch((error) => {
        console.error("Error adding person to project:", error);
      });
  };

  return (
    <Grid container spacing={2}>
       {error && <Grid item xs={12}><p>{error}</p></Grid>}
      <Grid item container xs={8} justifyContent="center" alignItems="center">
        <FormControl sx={{ m: 1, width: 600 }}>
          <InputLabel id="demo-multiple-chip-label">选择人员</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="选择人员" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value.split(':')[0]} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {people.map((person) => (
              <MenuItem
                key={person.perid}
                value={`${person.pername}:${person.pernumber}:${person.perrole}:${person.perid}`}
                style={getStyles(person.pername, personName, theme)}
              >
                {`${person.pername} - NO.${person.pernumber} - ${person.perrole}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item container xs={4}  justifyContent="flex-start" alignItems="center">
        <SaveButton children={"添加人员"} onClick={handleSaveClick}></SaveButton>
      </Grid>
    </Grid>
  );
}