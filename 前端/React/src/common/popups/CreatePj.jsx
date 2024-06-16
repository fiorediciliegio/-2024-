import React, { useState } from "react";
import {Grid} from "@mui/material";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TimePicker from "../components/TimePicker.jsx";
import { currencies } from "../constants/UNIT.js";
import { projecttype } from "../constants/PROJECT_INFO.js";
import CommonCreate from "./CommonCreate";
import useFormSubmit from '../hooks/useFormSubmit.js';

export default function CreatePj({ onClose }) {
  const [projectInfo, setProjectInfo] = useState({
    pjname: "",
    pjnumber: "",
    pjmanager: "",
    pjtype: "",
    pjvalue: "",
    pjcurrency: "",
    pjstart_date: "",
    pjend_date: "",
    pjaddress: "",
    pjdescription: "",
  });

  const handleChange = (value, fieldName) => {
    if (fieldName === "pjstart_date" || fieldName === "pjend_date") {
      setProjectInfo({ ...projectInfo, [fieldName]: value });
    } else {
      let fieldValue = value.target.value;
      setProjectInfo({ ...projectInfo, [fieldName]: fieldValue });
    }
  };

  const { handleSubmit, loading, error } = useFormSubmit();

  const fields = [
    { component: 
      <InputBox label="项目名称" value={projectInfo.pjname} onChange={(event) => handleChange(event, "pjname")} />, 
      width: 6 },
    { component: 
        <TimePicker label="项目开始时间" value={projectInfo.pjstart_date} onChange={(event) => handleChange(event, "pjstart_date")} />, 
        width: 6 },
    { component: 
      <InputBox label="项目编号" value={projectInfo.pjnumber} onChange={(event) => handleChange(event, "pjnumber")} />, 
      width: 6 },
    { component: 
        <TimePicker label="项目结束时间" value={projectInfo.pjend_date} onChange={(event) => handleChange(event, "pjend_date")} />, 
        width: 6 },
    { component: 
      <InputBox label="项目负责人" value={projectInfo.pjmanager} onChange={(event) => handleChange(event, "pjmanager")} />, 
      width: 6 },
    { component: 
        <InputBoxML label="项目地址" value={projectInfo.pjaddress} onChange={(event) => handleChange(event, "pjaddress")} />, 
        width: 6 },
    { component: 
      <SelectBox set={projecttype} label="项目类型" value={projectInfo.pjtype} onChange={(event) => handleChange(event, "pjtype")} width="25ch" />, 
      width: 6 },
    { component: 
        <InputBoxML label="项目描述" value={projectInfo.pjdescription} onChange={(event) => handleChange(event, "pjdescription")} />, 
        width: 6 },
    {
      component: (
        <Grid container direction="row">
          <Grid item xs={8}>
            <InputBox label="项目价值" value={projectInfo.pjvalue} onChange={(event) => handleChange(event, "pjvalue")} />
          </Grid>
          <Grid item xs={4}>
            <SelectBox set={currencies} label="货币" value={projectInfo.pjcurrency} onChange={(event) => handleChange(event, "pjcurrency")} width="10ch" />
          </Grid>
        </Grid>
      ),
      width: 6
    },
  ];

  const onSubmit = () => handleSubmit(projectInfo, "http://47.123.7.53:8000/project/add/", onClose);

  return( 
  <CommonCreate title="创建项目" fields={fields} onClose={onClose} onSubmit={onSubmit} >
    {loading && <p>正在提交...</p>}
    {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
  </CommonCreate>
  );
}
