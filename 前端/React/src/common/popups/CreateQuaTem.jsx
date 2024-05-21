import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Grid,TextField,IconButton ,Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TopBar from "../components/TopBar.jsx";
import SaveButton from "../components/SaveButton.jsx";

Modal.setAppElement("#root");

export default function CreateQuaTem({onClose, projectId}){
    //模板信息
    const [quaTemplate, setQuaTemplate] = useState({ qtname: '', subitems: [{ name: '', requirement: '' }] });
    // 用于处理输入框和选择框值的变化
    const handleChange = (index, field, value) => {
      const newSubItems = quaTemplate.subitems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      setQuaTemplate({ ...quaTemplate, subitems: newSubItems });
    };
    //添加子项
    const handleAddSubItem = () => {
      setQuaTemplate({ ...quaTemplate, subitems: [...quaTemplate.subitems, { name: '', requirement: '' }] });
    };
    //删除子项
    const handleRemoveSubItem = (index) => {
      const newSubItems = quaTemplate.subitems.filter((_, i) => i !== index);
      setQuaTemplate({ ...quaTemplate, subitems: newSubItems });
    };
    // 用于提交表单数据到后端API保存项目信息
    const handleSave = async() => {
        try{
            await axios.post(
                `http://47.123.7.53:8000/quality/template/add/${projectId}`,
                quaTemplate,
            );
            onClose();
        }catch(error){
            console.error("Error creating quality template:", error);
        }
    };
    
  return (
    <Modal
        isOpen={true}
        onRequestClose={onClose}
        style={{ content: { width: "60%", height: "80%", margin: "auto" } }}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* 顶部栏，显示页面标题，并提供关闭按钮 */}
        <TopBar title="创建质检模板" close={onClose}/>
        <Grid container  direction="column" spacing={2} marginTop={2}>
            <Grid item>
                <TextField
                    label="模板名称"
                    fullWidth
                    value={quaTemplate.qtname}
                    onChange={(e) => setQuaTemplate({ ...quaTemplate, qtname: e.target.value })}
                    sx={{ marginBottom: 2 }}
                /></Grid>
            {quaTemplate.subitems.map((subItem, index) => (
                <Grid item container spacing={2} key={index} sx={{ marginBottom: 2 }}>
                    <Grid item xs={1} alignContent="center" >
                      {/*这里补充子项目编号*/}
                      <Typography sx={{ textAlign: "center" }}>{index+1}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        multiline
                        label="检验项目"
                        fullWidth
                        value={subItem.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        /></Grid>
                    <Grid item xs={5}>
                        <TextField
                        multiline
                        label="规定值或允许偏差"
                        fullWidth
                        value={subItem.requirement}
                        onChange={(e) => handleChange(index, 'requirement', e.target.value)}
                        /></Grid>
                    <Grid item container xs={1} justifyContent="center">
                        <IconButton onClick={() => handleRemoveSubItem(index)}>
                        <Delete />
                        </IconButton></Grid>
                </Grid>
            ))}
            <Grid item container direction={"row"}>
                <Grid item container xs={10} alignContent="center" justifyContent="center">
                    <IconButton onClick={handleAddSubItem}>
                        <AddCircleIcon/>
                    </IconButton></Grid>
                <Grid item container xs={2} alignContent="center" justifyContent="center">
                    <SaveButton  children="保存" onClick={handleSave} /></Grid>
            </Grid>
        </Grid>
      </div>
    </Modal>
  );
}