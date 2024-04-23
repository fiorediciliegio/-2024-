import React, { useState, useEffect } from "react";
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import TimePicker from "../components/TimePicker.jsx";
import { currencies } from "../constants/UNIT.js";
import { projecttype } from "../constants/PROJECT_INFO.js";

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

  useEffect(() => {
    console.log(projectInfo);
  }, [projectInfo]);

  const handleSubmit = async () => {
    try {
      // Your submission logic
      onClose();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <TopBar title="创建项目" close={onClose} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} style={{ margin: "10px" }}>
          <Grid item xs={6}>
            <Grid container direction="column" spacing={2}>
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
                label="项目类型"
                value={projectInfo.pjtype}
                onChange={(event) => handleChange(event, "pjtype")}
                width="25ch"
              />
              <Grid container direction="row" spacing={2}>
                <Grid item>
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
          <Grid item container direction="column" xs={6} spacing={2}>
            <Grid item>
              <TimePicker
                label="项目开始时间"
                value={projectInfo.pjstart_date}
                onChange={(event) => handleChange(event, "pjstart_date")}
              />
            </Grid>
            <Grid item>
              <TimePicker
                label="项目结束时间"
                value={projectInfo.pjend_date}
                onChange={(event) => handleChange(event, "pjend_date")}
              />
            </Grid>
            <Grid item>
              <InputBoxML
                label="项目地址"
                value={projectInfo.pjaddress}
                onChange={(event) => handleChange(event, "pjaddress")}
              />
            </Grid>
            <Grid item>
              <InputBoxML
                label="项目描述"
                value={projectInfo.pjdescription}
                onChange={(event) => handleChange(event, "pjdescription")}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          取消
        </Button>
        <SaveButton onClick={handleSubmit}>保存</SaveButton>
      </DialogActions>
    </Dialog>
  );
}
