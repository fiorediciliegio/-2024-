import React, { useState, useEffect } from "react";
import { Grid, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import { personroles } from "../constants/PERSON_INFO.js";

export default function CreatePerson({ onClose }) {
  const [personInfo, setPersonInfo] = useState({
    pername: "",
    pernumber: "",
    perrole: "",
    permail: "",
    peravatar: "",
    perdescription: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [open, setOpen] = useState(true);

  const handleChange = (value, fieldName) => {
    let fieldValue = value.target.value;
    setPersonInfo({ ...personInfo, [fieldName]: fieldValue });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  const handleSubmit = async () => {
    try {
      // Your submission logic
      onClose();
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <TopBar title="添加人员" close={onClose} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item container direction="column" xs={6}>
            <label>
              <Avatar
                alt="Avatar"
                src={avatarFile ? URL.createObjectURL(avatarFile) : ""}
                style={{ width: 100, height: 100, marginTop: 10, cursor: "pointer" }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </label>
            <InputBox
              label="姓名"
              value={personInfo.pername}
              onChange={(event) => handleChange(event, "pername")}
            />
            <InputBox
              label="编号"
              value={personInfo.pernumber}
              onChange={(event) => handleChange(event, "pernumber")}
            />
            <InputBox
              label="邮箱"
              value={personInfo.permail}
              onChange={(event) => handleChange(event, "permail")}
            />
          </Grid>
          <Grid item container direction="column" xs={6}>
            <SelectBox
              set={personroles}
              label="职位"
              value={personInfo.perrole}
              onChange={(event) => handleChange(event, "perrole")}
              width="25ch"
            />
            <InputBoxML
              label="更多描述"
              value={personInfo.perdescription}
              onChange={(event) => handleChange(event, "perdescription")}
            />
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
