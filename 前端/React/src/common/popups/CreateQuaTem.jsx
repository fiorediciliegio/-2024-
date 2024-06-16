import React, { useState } from "react";
import { Grid, TextField, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CommonCreate from "./CommonCreate";
import useFormSubmit from '../hooks/useFormSubmit.js';

export default function CreateQuaTem({ onClose, projectId }) {
  const [quaTemplate, setQuaTemplate] = useState({ qtname: '', subitems: [{ name: '', requirement: '' }] });

  const handleChange = (index, field, value) => {
    const newSubItems = quaTemplate.subitems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setQuaTemplate({ ...quaTemplate, subitems: newSubItems });
  };

  const handleAddSubItem = () => {
    setQuaTemplate({ ...quaTemplate, subitems: [...quaTemplate.subitems, { name: '', requirement: '' }] });
  };

  const handleRemoveSubItem = (index) => {
    const newSubItems = quaTemplate.subitems.filter((_, i) => i !== index);
    setQuaTemplate({ ...quaTemplate, subitems: newSubItems });
  };

  const { handleSubmit, loading, error } = useFormSubmit();

  const fields = [
    { component: 
      <TextField label="模板名称" sx={{width:"90%"}} value={quaTemplate.qtname} onChange={(e) => setQuaTemplate({ ...quaTemplate, qtname: e.target.value })} />, 
      width: 12 },
    ...quaTemplate.subitems.map((subItem, index) => ({
      component: (
        <Grid container spacing={2} key={index} >
          <Grid item xs={1} alignContent="center">
            <Typography sx={{ textAlign: "center" }}>{index + 1}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField multiline label="检验项目" fullWidth value={subItem.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
          </Grid>
          <Grid item xs={5}>
            <TextField multiline label="规定值或允许偏差" fullWidth value={subItem.requirement} onChange={(e) => handleChange(index, 'requirement', e.target.value)} />
          </Grid>
          <Grid item xs={2} container justifyContent="center">
            <IconButton onClick={() => handleRemoveSubItem(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ),
      width: 12
    })),
    {
      component: (
        <Grid container spacing={2}>
          <Grid item container justifyContent="center">
            <IconButton onClick={handleAddSubItem}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      ),
      width: 12
    }
  ];

  const onSubmit = () => handleSubmit(quaTemplate, `http://47.123.7.53:8000/quality/template/add/${projectId}/`, onClose);

  return(
    <CommonCreate title="创建质检模板" fields={fields} onClose={onClose} onSubmit={onSubmit}>
      {loading && <p>正在提交...</p>}
      {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
    </CommonCreate>
  ) ;
}
