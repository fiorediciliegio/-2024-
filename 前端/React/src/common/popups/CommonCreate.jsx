import React from "react";
import Modal from "react-modal";
import { Grid } from "@mui/material";
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";

Modal.setAppElement("#root");

const CommonCreate = ({ title, fields, onClose, onSubmit }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{ content: { width: "60%", height: "80%", margin: "auto" } }}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={title} close={onClose} />
        <Grid container spacing={2} style={{ margin: "10px" }}>
          {fields.map((field, index) => (
            <Grid item xs={field.width || 12} key={index}>
              {field.component}
            </Grid>
          ))}
          <Grid item container justifyContent="center" alignItems="center">
            <SaveButton children="保存" onClick={onSubmit} />
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default CommonCreate;
