import React, { useState } from "react";
import { Grid, TextField, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CommonCreate from "./CommonCreate";
import useFormSubmit from '../hooks/useFormSubmit.js';

export default function CreateSafTem({ onClose, projectId }) {
  // 模板信息
  const [safTemplate, setSafTemplate] = useState({ stname: "", subitems: [{ name: "", requirement: "" }] });

  // 用于处理输入框和选择框值的变化
  const handleChange = (index, field, value) => {
    const newSubItems = safTemplate.subitems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setSafTemplate({ ...safTemplate, subitems: newSubItems });
  };

  // 添加子项
  const handleAddSubItem = () => {
    setSafTemplate({ ...safTemplate, subitems: [...safTemplate.subitems, { name: "", requirement: "" }] });
  };

  // 删除子项
  const handleRemoveSubItem = (index) => {
    const newSubItems = safTemplate.subitems.filter((_, i) => i !== index);
    setSafTemplate({ ...safTemplate, subitems: newSubItems });
  };

  // 用于提交表单数据到后端API保存项目信息
  const { handleSubmit, loading, error } = useFormSubmit();

  // 构建 fields 数组
  const fields = [
    {
      component: (
        <TextField
          label="模板名称"
          sx={{width:"90%"}}
          value={safTemplate.stname}
          onChange={(e) => setSafTemplate({ ...safTemplate, stname: e.target.value })}
        />
      ),
      width: 12
    },
    ...safTemplate.subitems.map((subItem, index) => ({
      component: (
        <Grid container spacing={2} key={index} >
          <Grid item xs={1} alignContent="center">
            <Typography sx={{ textAlign: "center" }}>{index + 1}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              multiline
              label="检验项目"
              fullWidth
              value={subItem.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              multiline
              label="检验标准"
              fullWidth
              value={subItem.requirement}
              onChange={(e) => handleChange(index, "requirement", e.target.value)}
            />
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
        <Grid container direction={"row"}>
          <Grid item container xs={10} alignContent="center" justifyContent="center">
            <IconButton onClick={handleAddSubItem}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      ),
      width: 12
    }
  ];

  const onSubmit = () => handleSubmit(safTemplate, `http://47.123.7.53:8000/safety/template/add/${projectId}/`, onClose);

  return (
    <CommonCreate title="创建安全报告模板" fields={fields} onClose={onClose} onSubmit={onSubmit} >
      {loading && <p>正在提交...</p>}
      {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
    </CommonCreate>
    );
}
