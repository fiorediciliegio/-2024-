import React, { useState, useEffect} from "react";
import axios from "axios";
import { useSearchParams} from "react-router-dom";
import { Grid,Paper,Typography,Box, Menu, MenuItem, ListItemText,Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import NavBarRO from "../components/NavBarRO.jsx";
import SideBar from "../components/SideBar.jsx";
import StackBar from "../components/BarChartSt.jsx";
import ReportList from "../components/ReportList.jsx";
import OpenButton from "../components/OpenButton.jsx";
import CreateQuality from "../popups/CreateQuality.jsx";
import CreateQuaTem from "../popups/CreateQuaTem.jsx";

export default function QualityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [templates, setTemplates] = useState([]);
  const [isTemplateDetailOpen, setIsTemplateDetailOpen] = useState(false); // 控制模板详细信息弹窗显示与隐藏
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await axios.get(`http://47.123.7.53:8000/quality/template/list/${projectId}/`);
    setTemplates(response.data.qit_templates);
  };

  //管理新建报告弹窗
  const [isCreateQualityOpen, setIsCreateQualityOpen] = useState(false);
  const openCreateQuality = () => {
    setIsCreateQualityOpen(true);
  };
  const closeCreateQuality = () => {
    setIsCreateQualityOpen(false);
  };
  
  //管理新建模板弹窗
  const [isCreateQuaTemOpen, setIsCreateQuaTemOpen] = useState(false);
  const openCreateQuaTem = () => {
    setIsCreateQuaTemOpen(true);
   };
   const closeCreateQuaTem = () => {
    setIsCreateQuaTemOpen(false);
  };

   // 处理模板详细信息显示
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
    await axios.delete(`http://47.123.7.53:8000/quality/template/delete/${selectedTemplate.id}/`);
    // 更新模板列表
    await fetchTemplates();
    handleCloseMenu();
  };

  return (
    <Grid container spacing={2}>
      {/* 顶部导航栏 */}
      <Grid item xs={12}>
        <NavBarRO
              title="ManageYourProject--质量监测"
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
          {/*柱状图 */}
          <Grid item container xs={5} spacing={2} justifyContent="flex-start" alignItems="flex-start">
            <StackBar/></Grid>
          {/*质量清单 */}
          <Grid item container xs={7} spacing={2} justifyContent="flex-start" alignItems="flex-start">
            <ReportList/></Grid>
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
                    <OpenButton children={"新建质检报告"} onClick={openCreateQuality}/>
                    {isCreateQualityOpen && <CreateQuality onClose={closeCreateQuality} templates={templates} projectId={projectId}/>}</Grid>
                  <Grid item>
                    <OpenButton children={"新建模板"} onClick={openCreateQuaTem}/>
                    {isCreateQuaTemOpen && <CreateQuaTem onClose={closeCreateQuaTem} projectId={projectId}/>}</Grid>
                </Grid> 
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
       {/* 模板详细信息弹窗 */}
       <Dialog open={isTemplateDetailOpen} onClose={handleCloseTemplateDetail}>
        <DialogTitle>模板详细信息</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedTemplate && (
              <div>
                <Typography variant="body1">名称: {selectedTemplate.name}</Typography>
                {/* 在这里添加模板的其他详细信息 */}
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
