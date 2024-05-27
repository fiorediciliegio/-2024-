import React, { useState, useEffect} from "react";
import axios from "axios";
import { useSearchParams} from "react-router-dom";
import { Grid,Paper,Typography,Box } from "@mui/material";
import NavBarRO from "../components/NavBarRO.jsx";
import SideBar from "../components/SideBar.jsx";
import StackBar from "../components/BarChartSt.jsx";
import ReportList from "../components/ReportList.jsx";
import OpenButton from "../components/OpenButton.jsx";
import CreateSafety from "../popups/CreateSafety.jsx";
import CreateSafTem from "../popups/CreateSafTem.jsx";

export default function SafetyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectName = searchParams.get("projectName");
  const projectId = searchParams.get("projectId");
  const [templates, setTemplates] = useState([]);
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
                    <Box key={template.id} sx={{ margin: "10px 0" }}>
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
  </Grid>
);
}
