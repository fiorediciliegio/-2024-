import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Grid, Avatar } from "@material-ui/core"; // Import Avatar from Material-UI
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import { personroles } from "../constants/PERSON_INFO.js";

Modal.setAppElement("#root");

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

  const handleChange = (value, fieldName) => {
    let fieldValue = value.target.value;
    setPersonInfo({ ...personInfo, [fieldName]: fieldValue });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  useEffect(() => {
    console.log(personInfo);
  }, [personInfo]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("pername", personInfo.pername);
      formData.append("pernumber", personInfo.pernumber);
      formData.append("perrole", personInfo.perrole);
      formData.append("permail", personInfo.permail);
      formData.append("peravatar", avatarFile);
      formData.append("perdescription", personInfo.perdescription);

      await axios.post("https://60.205.114.207:8000/create_project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onClose();
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{ content: { width: "50%", height: "80%", margin: "auto" } }}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title="添加人员" close={onClose}></TopBar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
              <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {/*选择用户头像*/}
          <Grid item>
            {/* 使用 label 包裹 input 元素 */}
            <label>
              <Avatar
                alt="Avatar"
                src={avatarFile ? URL.createObjectURL(avatarFile) : ""}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  cursor: "pointer",
                }}
              />
              {/* 隐藏 input 元素 */}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </label>
          </Grid>
          <Grid item>
            <InputBox
              label="姓名"
              value={personInfo.pername}
              onChange={(event) => handleChange(event, "pername")}
            ></InputBox>
            <InputBox
              label="编号"
              value={personInfo.pernumber}
              onChange={(event) => handleChange(event, "pernumber")}
            ></InputBox>
            <InputBox
              label="邮箱"
              value={personInfo.permail}
              onChange={(event) => handleChange(event, "permail")}
            ></InputBox>
            </Grid>
            <Grid item>
            <SelectBox
              set={personroles}
              label="职位"
              value={personInfo.perrole}
              onChange={(event) => handleChange(event, "perrole")}
            ></SelectBox>
            <InputBoxML
              label="更多描述"
              value={personInfo.perdescription}
              onChange={(event) => handleChange(event, "perdescription")}
            ></InputBoxML>
          </Grid>
          
        </Grid>
        <Grid item container justifyContent="center" alignItems="center">
          <SaveButton children="保存" onClick={handleSubmit}></SaveButton>
        </Grid>
      </div>
    </Modal>
  );
}
