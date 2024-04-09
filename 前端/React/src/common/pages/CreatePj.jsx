import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";
import { currencies } from "../constants/UNIT.js";
import { projecttype } from "../constants/PROJECT_INFO.js";

Modal.setAppElement("#root");

export default function CreatePj({ onClose }) {
  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title="创建项目" close={onClose}></TopBar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item container xs={6}>
            <InputBox value="项目名称"></InputBox>
            <InputBox value="项目类型"></InputBox>
            <InputBox value="项目编号"></InputBox>
            <SelectBox set={projecttype}></SelectBox>
            <Grid item container>
              <Grid item container xs={10}>
                <InputBox value="项目价值"></InputBox>
              </Grid>
              <Grid item container xs={2}>
                <SelectBox set={currencies}></SelectBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <InputBox value="项目开始时间"></InputBox>
            <InputBox value="项目结束时间"></InputBox>
            <InputBoxML value="项目地址"></InputBoxML>
            <InputBoxML value="项目描述"></InputBoxML>
            <SaveButton children="保存"></SaveButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
