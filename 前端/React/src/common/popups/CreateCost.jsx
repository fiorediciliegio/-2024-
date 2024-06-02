import React, { useState } from 'react';
import Modal from "react-modal";
import { Grid, TextField } from '@mui/material';
import TopBar from "../components/TopBar.jsx";
import SaveButton from '../components/SaveButton';
import axios from 'axios';
import InputBox from "../components/InputBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import SelectBox from "../components/SelectBox.jsx";
import TimePicker from "../components/TimePicker.jsx";
import { currencies } from "../constants/UNIT.js";
import {expenseTypes} from "../constants/COST_INFO.js";

Modal.setAppElement("#root");


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
 const handleSubmit = async () => {
  try {
    await axios.post(`http://47.123.7.53:8000/cost/add/${projectId}/`, costReport);
    onClose();
  } catch (error) {
    console.error("Error creating cost:", error);
  }
};

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{ content: { width: '60%', height: '80%', margin: 'auto', zIndex: 1300 } }}
    >
       <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 顶部栏，显示页面标题，并提供关闭按钮 */}
        <TopBar title="新建成本单" close={onClose}/>
         {/* 使用 Grid 容器来创建两行布局 */}
        <Grid container direction="column" spacing={2} marginTop={2}>
           {/*第一行：title*/}
          <Grid item container >
             {/*成本单信息*/}
             <TextField
              label="输入成本名称"  sx={{marginLeft:2, marginRight:2}}
              fullWidth  value={costReport.costName}  
              onChange={(event) => handleChange(event, "costName")}/>
          </Grid>
          {/* 第二行：使用 Grid 容器来创建两列布局 */}
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            spacing={2} // 添加间距
            style={{ margin: "10px" }}
          >
            {/* 第一列 */}
            <Grid item container direction="column" spacing={2} xs={6}>
            <Grid item>
              <InputBox
                label="所属项目"
                value={costReport.projectName}
                onChange={(event) => handleChange(event, "projectName")}
              /></Grid>
              <Grid item>
                <SelectBox
                  label="费用类型"
                  set={expenseTypes}
                  value={costReport.expenseType}
                  onChange={(event) => handleChange(event, "expenseType")}
                  width="25ch"
                /></Grid>
              <Grid item container direction="row">
                <Grid item >
                  <InputBox
                    label="预算金额"
                    value={costReport.budgetAmount}
                    onChange={(event) => handleChange(event, "budgetAmount")}
                  /></Grid>
                <Grid item>
                  <SelectBox
                        set={currencies}
                        label="货币"
                        value={costReport.currency}
                        onChange={(event) => handleChange(event, "currency")}
                        width="10ch"/></Grid>
                </Grid>
              <Grid item>
                 <InputBoxML
                  label="描述"
                  value={costReport.description}
                  onChange={(event) => handleChange(event, "description")}
                /></Grid>
            </Grid>
             {/* 第二列 */}
             <Grid item container direction="column" xs={6} spacing={2}>
              <Grid item>
                  <TimePicker 
                    label="日期" 
                    value={costReport.date}
                    onChange={(event) => handleChange(event, "date")}
                  /></Grid>
              <Grid item>
                <InputBox
                  label="财务人员"
                  value={costReport.accountant}
                  onChange={(event) => handleChange(event, "accountant")}
                /></Grid>
              <Grid item container direction="row">
                <Grid item >
                  <InputBox
                    label="执行金额"
                    value={costReport.costAmount}
                    onChange={(event) => handleChange(event, "costAmount")}
                  /></Grid>
                <Grid item>
                  <SelectBox
                        set={currencies}
                        label="货币"
                        value={costReport.currency}
                        onChange={(event) => handleChange(event, "currency")}
                        width="10ch"/></Grid>
                </Grid>
              <Grid item container justifyContent="center" alignItems="center">
                <SaveButton  children="保存" onClick={handleSubmit} /></Grid>
              </Grid>
            </Grid>
            
       </Grid>
      </div>
    </Modal>
  );
};


