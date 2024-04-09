import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Grid } from "@material-ui/core";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import PeriodPicker from "../components/DatePicker.jsx";
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

  const handleChange = (event, fieldName) => {
    const value = event.target.value;
    setProjectInfo({ ...projectInfo, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/create_project", projectInfo);
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title="创建项目" close={onClose} />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item container xs={6}>
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
            <SelectBox
              set={projecttype}
              value={projectInfo.pjtype}
              onChange={(event) => handleChange(event, "pjtype")}
            />
            <Grid item container>
              <Grid item container xs={10}>
                <InputBox
                  label="项目价值"
                  value={projectInfo.pjvalue}
                  onChange={(event) => handleChange(event, "pjvalue")}
                />
              </Grid>
              <Grid item container xs={2}>
                <SelectBox
                  set={currencies}
                  value={projectInfo.pjcurrency}
                  onChange={(event) => handleChange(event, "pjcurrency")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <InputBox
              label="项目开始时间"
              value={projectInfo.pjstart_date}
              onChange={(event) => handleChange(event, "pjstart_date")}
            />
            <InputBox
              label="项目结束时间"
              value={projectInfo.pjend_date}
              onChange={(event) => handleChange(event, "pjend_date")}
            />
            <InputBoxML
              label="项目地址"
              value={projectInfo.pjaddress}
              onChange={(event) => handleChange(event, "pjaddress")}
            />
            <InputBoxML
              label="项目描述"
              value={projectInfo.pjdescription}
              onChange={(event) => handleChange(event, "pjdescription")}
            />
            <PeriodPicker></PeriodPicker>
            <SaveButton onClick={handleSubmit} children="保存"></SaveButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
