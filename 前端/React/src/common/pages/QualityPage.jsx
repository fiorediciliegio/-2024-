import React, { useState, useEffect} from "react";
import axios from "axios";
import { useSearchParams} from "react-router-dom";
import { Grid,Paper,Typography,Box } from "@mui/material";
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
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await axios.get('url');
    setTemplates(response.data);
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
                <Grid item container xs={10}>
                  <Typography variant="h6">模板</Typography>
                    {templates.map((template) => (
                        <Box key={template.id} sx={{ margin: '10px 0' }}>
                        <Typography variant="body1">{template.name}</Typography>
                        {/* 显示子项目列表 */}
                        {template.subitems.map((item, index) => (
                            <Typography key={index} variant="body2">
                            {item.name} - {item.requirement}
                            </Typography>
                        ))}
                        </Box>
                    ))}
                </Grid>
                <Grid item container xs={2} direction="column" spacing={2}>
                  <Grid item>
                    <OpenButton children={"新建质检报告"} onClick={openCreateQuality}/>
                    {isCreateQualityOpen && <CreateQuality onClose={closeCreateQuality} />}</Grid>
                  <Grid item>
                    <OpenButton children={"新建模板"} onClick={openCreateQuaTem}/>
                    {isCreateQuaTemOpen && <CreateQuaTem onClose={closeCreateQuaTem} projectId={projectId}/>}</Grid>
                </Grid> 
              </Grid>
          </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
