import React, { useState, useEffect } from "react";
import { Grid} from "@mui/material";
import axios from "axios";
import Modal from "react-modal";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import ReadOnlyText from "../components/ReadOnlyText.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import { personroles } from "../constants/PERSON_INFO.js";

Modal.setAppElement("#root");

export default function CreatePerson({ onClose}) {
  const [personInfo, setPersonInfo] = useState({
    pername: "",
    pernumber: "",
    perrole: "",
    permail: "",
    perdescription: "",
  });
  // 用于处理输入框和选择框值的变化
  const handleChange = (value, fieldName) => {
    let fieldValue = value.target.value;
    setPersonInfo({ ...personInfo, [fieldName]: fieldValue });
  };

  useEffect(() => {
    console.log(personInfo);
  }, [personInfo]);

  // 用于提交表单数据到后端API保存项目信息
  const handleSubmit = async () => {
     try {
      await axios.post(
        "http://47.123.7.53:8000/create_person/",
        personInfo,
      );
      onClose();
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  return (
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        style={{ content: { width: "60%", height: "70%", margin: "auto" } }}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {/* 顶部栏，显示页面标题，并提供关闭按钮 */}
          <TopBar title="创建项目" close={onClose}/>
          {/* 使用 Grid 容器来创建两列布局 */}
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            spacing={2} // 添加间距
            style={{ margin: "10px" }}
          >
          {/* 第一列 */}
            <Grid item container direction="column" spacing={2} xs={6}>
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
           {/* 第二列 */}
            <Grid item container direction="column" xs={6} spacing={2}>   
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
              <SaveButton onClick={handleSubmit}>保存</SaveButton>
            </Grid>
          </Grid>
        </div>
      </Modal>
  );
}
