import React from "react";
import { Grid } from "@mui/material";
import PersonList from "../components/PersonList4Pj.jsx";
import BasicBarH from "../components/BarChartH.jsx";
import ChipSelectBox from "../components/ChipSelectBox.jsx";
import CommonPage from "../components/CommonPage.jsx";
import useProjectParams from "../hooks/useProjectParams.js"; 
import { useAuth } from '../hooks/AuthContext';

export default function PersonnelPage() {
  const { projectName, projectId } = useProjectParams();
  // 根据用户级别决定按钮的可用性
  const { user } = useAuth();
  const isEmployee = user && user.level === '一般人员'; 
  const isManager = user && user.level === '管理者'; 

  return (
    <CommonPage
      pageName={"人力资源"} 
      projectId={projectId}
      projectName={projectName}>
      {/*第一行 */}
      <Grid item container spacing={2}>
            {/*现有人员列表 */}
            <Grid item container xs={5} marginTop={2} justifyContent="flex-start" alignItems="flex-start">
              <PersonList projectId={projectId}/>
            </Grid>
            {/*柱状图 */}
            <Grid item container xs={7} spacing={2} justifyContent="flex-start" alignItems="flex-start">
              <BasicBarH pjID={projectId}/>
            </Grid>
          </Grid>
          {/*第二行 */}
          <Grid item container marginTop ={4} >
            {/*向项目中添加人员 */}
            {isManager && 
            <Grid item container xs={12} spacing={2} justifyContent="flex-start" alignItems="center">
              <ChipSelectBox projectId={projectId}/>
            </Grid>}
          </Grid>
    </CommonPage>   
  );
}
          