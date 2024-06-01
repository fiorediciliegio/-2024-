import React, { useState, useEffect} from "react";
import axios from "axios";
import { useSearchParams} from "react-router-dom";
import { Grid,Paper,Typography,Box,Menu, MenuItem, ListItemText,Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import NavBarRO from "../components/NavBarRO.jsx";
import SideBar from "../components/SideBar.jsx";
import OpenButton from "../components/OpenButton.jsx";
import CreateSafety from "../popups/CreateSafety.jsx";
import CreateSafTem from "../popups/CreateSafTem.jsx";
import TitlebarImageList from "../components/ImageList.jsx";
import SafetyIssueList from "../components/SafetyIssueList.jsx";

export default function SafetyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [templates, setTemplates] = useState([]);
  const [isTemplateDetailOpen, setIsTemplateDetailOpen] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await axios.get(`http://47.123.7.53:8000/safety/template/list/${projectId}/`);
    setTemplates(response.data.sct_templates);
  };

  //管理新建报告弹窗
  const [isCreateSafetyOpen, setIsCreateSafetyOpen] = useState(false);
  const openCreateSafety = () => {
    setIsCreateSafetyOpen(true);
  };
  const closeCreateQuality = () => {
    setIsCreateSafetyOpen(false);
  };
  
  //管理新建模板弹窗
  const [isCreateSafTemOpen, setIsCreateSafTemOpen] = useState(false);
  const openCreateSafTem = () => {
    setIsCreateSafTemOpen(true);
   };
   const closeCreateSafTem = () => {
    setIsCreateSafTemOpen(false);
  };

  //处理模板详细信息显示
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  //点击模板显示详细信息
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setIsTemplateDetailOpen(true); // 点击模板时显示详细信息弹窗
  };

  // 关闭模板详细信息弹窗
  const handleCloseTemplateDetail = () => {
    setIsTemplateDetailOpen(false);
  };
 
   // 处理删除模板操作
   const [anchorEl, setAnchorEl] = useState(null);
   const handleTemplateDeleteClick = (event, template) => {
     event.preventDefault();
     setAnchorEl(event.currentTarget);
     setSelectedTemplate(template);
   };
   const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = async () => {
    // 发送删除模板的请求
    await axios.post("http://47.123.7.53:8000/safety/template/delete/",{st_id:selectedTemplate.id});
    // 更新模板列表
    await fetchTemplates();
    handleCloseMenu();
  };

  return (
    <Grid container spacing={2}>
    {/* 顶部导航栏 */}
    <Grid item xs={12}>
      <NavBarRO
            title="ManageYourProject--安全监测"
            projectName={projectName}
          /></Grid>
    <Grid item container spacing={2}>
      {/* 侧边栏 */}
      <Grid
        item
        container
        justifyContent="center"
        alignItems="flex-start"
        xs={2}
      >
        <SideBar projectName={projectName} projectId={projectId}/></Grid>
      <Grid item container xs={10} spacing={2}>
        {/*问题列表 */}
        <Grid item xs={5} justifyContent="flex-start" alignItems="flex-start">
          <SafetyIssueList projectId={projectId} projectName={projectName}/></Grid>
        {/*安全照片集合 */}
        <Grid item xs={7} justifyContent="flex-start" alignItems="flex-start">
          <Typography>安全现场照片</Typography>
          <TitlebarImageList projectId={projectId}/></Grid>
          {/*创建模板及报告 */}
        <Grid item container xs={12} spacing={2} justifyContent="flex-start" alignItems="flex-start">
          <Paper style={{ width: "95%", height: "100%", padding: "15px" }}>
            <Grid container >
              <Grid item container xs={10} direction={"column"}>
              <Typography variant="h6">模板</Typography>
                  {templates && templates.length > 0 ? (
                    templates.map((template) => (
                      <Box 
                        key={template.id} 
                        sx={{ margin: "10px 0", cursor: "pointer" }}
                        onClick={() => handleTemplateClick(template)}
                        onContextMenu={(event) => handleTemplateDeleteClick(event, template)}
                      >
                        <Typography variant="body1">{template.name}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1">暂无模板</Typography>
                  )}
              </Grid>
              <Grid item container xs={2} direction="column" spacing={2}>
                <Grid item>
                  <OpenButton children={"新建安全报告"} onClick={openCreateSafety}/>
                  {isCreateSafetyOpen && <CreateSafety onClose={closeCreateQuality} templates={templates} projectId={projectId}/>}</Grid>
                <Grid item>
                  <OpenButton children={"新建模板"} onClick={openCreateSafTem}/>
                  {isCreateSafTemOpen && <CreateSafTem onClose={closeCreateSafTem} projectId={projectId}/>}</Grid>
              </Grid> 
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
    {/* 模板详细信息弹窗 */}
    <Dialog open={isTemplateDetailOpen} onClose={handleCloseTemplateDetail}>
        <DialogTitle>详细信息</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {selectedTemplate && (
                <div>
                  <Typography variant="body1">模板名称: {selectedTemplate.name}</Typography>

                  {selectedTemplate.items && selectedTemplate.items.length > 0 ? (
                    <ul>
                      {selectedTemplate.items.map((item) => (
                        <li key={item.id}>
                          <Typography variant="body2">
                            检验项目: {item.name}  —— 检验标准: {item.value}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2">暂无检验项目</Typography>
                  )}
                </div>
              )}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTemplateDetail}>关闭</Button>
        </DialogActions>
      </Dialog>
       {selectedTemplate && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
        >
          <MenuItem onClick={handleDeleteTemplate}>
            <ListItemText primary="删除模板" />
          </MenuItem>
        </Menu>
      )}
  </Grid>
);
}
