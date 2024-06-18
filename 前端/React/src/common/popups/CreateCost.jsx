import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import InputBox from "../components/InputBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import SelectBox from "../components/SelectBox.jsx";
import TimePicker from "../components/TimePicker.jsx";
import { currencies } from "../constants/UNIT.js";
import {expenseTypes} from "../constants/COST_INFO.js";
import CommonCreate from "./CommonCreate.jsx";
import useFormSubmit from '../hooks/useFormSubmit.js';


export default function CreateCost ({ projectName, projectId, onClose})  {
  const [costReport, setCostReport] = useState({
    costName: '',
    projectName: projectName,
    date: '',
    expenseType: '',
    accountant: '',
    budgetAmount: '',
    currency:'',
    costAmount: '',
    description: ''
  });

  // 用于处理输入框和选择框值的变化
  const handleChange = (value, fieldName) => {
    if (fieldName === "date" ) {
      setCostReport({ ...costReport, [fieldName]: value });
    } else {
      let fieldValue = value.target.value;
      setCostReport({ ...costReport, [fieldName]: fieldValue });
    }
  };

 /// 提交表单数据到后端API保存项目信息
const { handleSubmit, loading, error } = useFormSubmit();
const fields = [
  {
    component: (
      <TextField
        label="输入成本名称"
        sx={{width:"90%"}}
        value={costReport.costName}
        onChange={(event) => handleChange(event, "costName")}
      />
    ),
    width: 12
  },
  {component: 
      <InputBox
        label="所属项目"
        value={costReport.projectName}
        onChange={(event) => handleChange(event, "projectName")}/>,
    width: 6},
  {component: 
    <TimePicker
      label="日期"
      value={costReport.date}
      onChange={(event) => handleChange(event, "date")}/>,
  width: 6},
  {component: 
      <SelectBox
        label="费用类型"
        set={expenseTypes}
        value={costReport.expenseType}
        onChange={(event) => handleChange(event, "expenseType")}
        width="25ch"/>,
    width: 6},
  {component: 
      <InputBox
        label="财务人员"
        value={costReport.accountant}
        onChange={(event) => handleChange(event, "accountant")}/>,
    width: 6},
  {component: (
    <Grid container direction="row">
      <Grid item xs={8}>
        <InputBox
          label="预算金额"
          value={costReport.budgetAmount}
          onChange={(event) => handleChange(event, "budgetAmount")}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectBox
          set={currencies}
          label="货币"
          value={costReport.currency}
          onChange={(event) => handleChange(event, "currency")}
          width="10ch"
        />
      </Grid>
    </Grid>),
    width: 6},
  {component: (
      <Grid container direction="row">
        <Grid item xs={8}>
          <InputBox
            label="执行金额"
            value={costReport.costAmount}
            onChange={(event) => handleChange(event, "costAmount")}
          />
          </Grid>
        <Grid item xs={4}>
          <SelectBox
            set={currencies}
            label="货币"
            value={costReport.currency}
            onChange={(event) => handleChange(event, "currency")}
            width="10ch"
          />
        </Grid>
      </Grid>),
    width: 6},
  {component: 
      <InputBoxML
        label="描述"
        value={costReport.description}
        onChange={(event) => handleChange(event, "description")}/>,
    width: 6},
];
const onSubmit = () => handleSubmit(costReport, `http://47.123.7.53:8000/cost/add/${projectId}/`, onClose);

  return (
    <CommonCreate
      title="新建成本单"
      fields={fields}
      onClose={onClose}
      onSubmit={onSubmit}>
        {loading && <p>正在提交...</p>}
        {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
    </CommonCreate>
  );
};


