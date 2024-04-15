import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Grid } from "@material-ui/core";
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
  useEffect(() => {
    console.log(projectInfo);
  }, [projectInfo]);

  // 用于提交表单数据到后端API保存项目信息
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://60.205.114.207:8000/create_project",
        projectInfo,
      );
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部栏，显示页面标题，并提供关闭按钮 */}
        <TopBar title="创建项目" close={onClose}></TopBar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            item
            container
            xs={6}
            direction="row"
            justifyContent="flex-start"
          >
            {/* InputBox 组件，用于输入项目名称 */}
            <InputBox
              label="项目名称"
              value={projectInfo.pjname}
              onChange={(event) => handleChange(event, "pjname")}
            ></InputBox>
            <InputBox
              label="项目编号"
              value={projectInfo.pjnumber}
              onChange={(event) => handleChange(event, "pjnumber")}
            ></InputBox>
            <InputBox
              label="项目负责人"
              value={projectInfo.pjmanager}
              onChange={(event) => handleChange(event, "pjmanager")}
            ></InputBox>
            {/* SelectBox 组件，用于选择项目类型 */}
            <SelectBox
              set={projecttype}
              label="项目类型"
              value={projectInfo.pjtype}
              onChange={(event) => handleChange(event, "pjtype")}
            ></SelectBox>
            <Grid item container>
              <Grid item container xs={10}>
                <InputBox
                  label="项目价值"
                  value={projectInfo.pjvalue}
                  onChange={(event) => handleChange(event, "pjvalue")}
                ></InputBox>
              </Grid>
              <Grid item container xs={2}>
                <SelectBox
                  set={currencies}
                  label="货币"
                  value={projectInfo.pjcurrency}
                  onChange={(event) => handleChange(event, "pjcurrency")}
                ></SelectBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={6}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {/* TimePicker 组件，用于选择项目开始时间 */}
            <TimePicker
              label="项目开始时间"
              value={projectInfo.pjstart_date}
              onChange={(event) => handleChange(event, "pjstart_date")}
            ></TimePicker>
            <TimePicker
              label="项目结束时间"
              value={projectInfo.pjend_date}
              onChange={(event) => handleChange(event, "pjend_date")}
            ></TimePicker>
            <InputBoxML
              label="项目地址"
              value={projectInfo.pjaddress}
              onChange={(event) => handleChange(event, "pjaddress")}
            ></InputBoxML>
            <InputBoxML
              label="项目描述"
              value={projectInfo.pjdescription}
              onChange={(event) => handleChange(event, "pjdescription")}
            ></InputBoxML>
            {/* SaveButton 组件，用于保存项目信息 */}
            <SaveButton children="保存" onClick={handleSubmit}></SaveButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
