import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Grid } from "@mui/material";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import TimePicker from "../components/TimePicker.jsx";
import { currencies } from "../constants/UNIT.js";
import { projecttype } from "../constants/PROJECT_INFO.js";

Modal.setAppElement("#root");

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
  // 用于处理输入框和选择框值的变化
  const handleChange = (value, fieldName) => {
    if (fieldName === "pjstart_date" || fieldName === "pjend_date") {
      // Date values are string and don't need to be formatted
      setProjectInfo({ ...projectInfo, [fieldName]: value });
    } else {
      // For non-date fields, your original logic can be maintained.
      // Ensure that the value is retrieved correctly in the event handlers of these components.
      let fieldValue = value.target.value;
      setProjectInfo({ ...projectInfo, [fieldName]: fieldValue });
    }
  };

  // 用于提交表单数据到后端API保存项目信息
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://47.123.7.53:8000/create_project/",
        projectInfo,
      );
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        style={{ content: { width: "60%", height: "90%", margin: "auto" } }}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {/* 顶部栏，显示页面标题，并提供关闭按钮 */}
          <TopBar title="创建项目" close={onClose}></TopBar>
          {/* 使用 Grid 容器来创建两列布局 */}
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            spacing={2} // 添加间距
            style={{ margin: "10px" }}
          >
            {/* 第一列 */}
            <Grid item xs={6}>
              <Grid container direction="column" spacing={2}>
                {/* InputBox 组件，用于输入项目名称 */}
                <InputBox
                  label="项目名称"
                  value={projectInfo.pjname}
                  onChange={(event) => handleChange(event, "pjname")}
                />
                <InputBox
                  label="项目编号"
                  value={projectInfo.pjnumber}
                  onChange={(event) => handleChange(event, "pjnumber")}
                />
                <InputBox
                  label="项目负责人"
                  value={projectInfo.pjmanager}
                  onChange={(event) => handleChange(event, "pjmanager")}
                />
                {/* SelectBox 组件，用于选择项目类型 */}
                <SelectBox
                  set={projecttype}
                  label="项目类型"
                  value={projectInfo.pjtype}
                  onChange={(event) => handleChange(event, "pjtype")}
                  width="25ch"
                />
                {/* 项目价值和货币选择框放在同一行 */}
                <Grid container direction="row" >
                  <Grid item >
                    <InputBox
                      label="项目价值"
                      value={projectInfo.pjvalue}
                      onChange={(event) => handleChange(event, "pjvalue")}
                    />
                  </Grid>
                  <Grid item>
                    <SelectBox
                      set={currencies}
                      label="货币"
                      value={projectInfo.pjcurrency}
                      onChange={(event) => handleChange(event, "pjcurrency")}
                      width="10ch"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* 第二列 */}
              <Grid item container direction="column" xs={6} spacing={2}>
                {/* TimePicker 组件，用于选择项目开始时间 */}
                <Grid item>
                <TimePicker
                  label="项目开始时间"
                  value={projectInfo.pjstart_date}
                  onChange={(event) => handleChange(event, "pjstart_date")}
                /></Grid>
                <Grid item>
                <TimePicker
                  label="项目结束时间"
                  value={projectInfo.pjend_date}
                  onChange={(event) => handleChange(event, "pjend_date")}
                /></Grid>
                <Grid item>
                <InputBoxML
                  label="项目地址"
                  value={projectInfo.pjaddress}
                  onChange={(event) => handleChange(event, "pjaddress")}
                /></Grid>
                <Grid item>
                <InputBoxML
                  label="项目描述"
                  value={projectInfo.pjdescription}
                  onChange={(event) => handleChange(event, "pjdescription")}
                /></Grid>
                {/* SaveButton 组件，用于保存项目信息 */}
                <Grid item container justifyContent="center"
                alignItems="center">
                <SaveButton children="保存" onClick={handleSubmit} /></Grid>
              </Grid>
            </Grid>
        </div>
      </Modal>
  );
}