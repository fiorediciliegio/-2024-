import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Grid,Button, Paper,Card, TextField,
  CardContent, CardActionArea, Dialog,DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; 

export default function SafetyIssueList ({projectId, projectName}) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [resolutionFeedback, setResolutionFeedback] = useState('')
  const [resolutionDate, setResolutionDate] = useState(dayjs());
  //获取安全列表
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`http://47.123.7.53:8000/safety/issue/list/${projectId}/`);
        // 检查响应数据是否为数组
        if (Array.isArray(response.data.filtered_reports)) {
          setIssues(response.data.filtered_reports);
        } else {
          // 如果不是数组，则将其转换为数组并设置
          setIssues([response.data]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [projectId]);

  //根据状态显示卡片颜色
  const getCardStyle = (Status) => {
    switch (Status) {
      case '一般安全问题':
        return { backgroundColor:  'rgba(255, 224, 70, 0.5)'}; // 橙色
      case '重大安全问题':
        return { backgroundColor: 'rgba(255, 100, 100, 0.5)' }; // 红色
      default:
        return {}; // 默认样式
    }
  };
  //控制弹窗
  const handleOpenDialog = (issue) => {
    setSelectedIssue(issue);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIssue(null);
    setResolutionFeedback('');
    setResolutionDate(dayjs());
  };
  //处理问题
  const handleSafetyIssue=async()=>{
    try {
      await axios.post('http://47.123.7.53:8000/safety/issue/resolve/', {
        issueId: selectedIssue.report_id,
        resolution: resolutionFeedback,
        res_Date: resolutionDate.toISOString().split('T')[0] // 格式化日期为 YYYY-MM-DD
      });
      // 成功处理后关闭弹窗并刷新问题列表
      handleCloseDialog();
      setLoading(true);
      const response = await axios.get(`http://47.123.7.53:8000/safety/issue/list/${projectId}/`);
      setIssues(response.data.filtered_reports);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };
  return (
      <div>
        <Grid container margin={1}>
          <Paper style={{ width: "100%", height: "100%", padding: "20px"}}>
            <Typography variant="h6" gutterBottom>
              现存安全问题:
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography variant="body2" color="error">
                错误: {error.message}
              </Typography>
            ) : issues.length === 0 ? (
              <Typography variant="body2">没有发现安全问题。</Typography>
            ) : (
              issues.map((issue) => (
              <Grid item xs={12} key={issue.report_id} marginBottom={1}>
                <Card variant="outlined" sx={{ ...getCardStyle(issue.srevaluation), minHeight: '100%'}}>
                  <CardActionArea onClick={() => handleOpenDialog(issue)}>
                    <CardContent>
                      {/*标题：问题工程*/}
                      <Typography variant="h6" component="div">
                        {issue.srname}
                        </Typography>
                        {/*问题反馈*/}
                      <Typography variant="body2" component="div">
                        {issue.srfeedback}
                        </Typography>
                        {/*上报时间*/}
                      <Typography variant="caption">
                        {issue.srins_date}
                        </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
          </Paper>
        </Grid>
        {selectedIssue && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
         {/* 这里放弹窗内容 */}
         <DialogTitle sx={{background: "lightBlue"}}>处理安全问题</DialogTitle>
         <DialogContent style={{ minWidth: '500px', minHeight: '300px' }}>
          <Grid container spacing={2} direction="column">
            <Grid item marginTop={1}>
            <Typography variant="h6" gutterBottom align="center">
                {selectedIssue.srname}安全报告
              </Typography>
            </Grid>
            {/*基本信息*/}
            <Grid item container spacing={1} direction="row">
              <Grid item container xs={6} direction="column">
                <Typography variant='body2' gutterBottom>
                  所属项目：{projectName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  安全员：{selectedIssue.srperson}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  报告编号：{selectedIssue.srnumber}
                </Typography>
              </Grid>
              <Grid item container xs={6} direction="column">
                <Typography variant="body2" gutterBottom>
                  检查部位及编号：{selectedIssue.srpart}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  检查日期：{selectedIssue.srins_date}
                </Typography>
              </Grid>
            </Grid>
            {/*子项目信息*/}
            <Grid item container spacing={1} direction="row">
              {selectedIssue.srsubitems.map((subItem, index) => (
                <Grid item container>
                  <Grid item xs={1} alignContent="center" >
                    <Typography  variant="body2" gutterBottom>{index+1}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography  variant="body2" gutterBottom>检查项目:{subItem.item}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography  variant="body2" gutterBottom>检查标准：{subItem.requirement}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography  variant="body2" gutterBottom>检查结果：{subItem.result}</Typography>
                  </Grid>
                </Grid>
                )
                )}
            </Grid>
            {/*处理方案*/}
            <Grid item container spacing={1} direction="row">
              <TextField
                  label="处理方案"
                  fullWidth
                  multiline
                  sx={{ marginBottom: 2 }}
                  minRows={4}
                  value={resolutionFeedback}
                  onChange={(e) => setResolutionFeedback(e.target.value)}
                />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="处理日期"
                    readOnly
                    value={resolutionDate}
                    onChange={(date) => setResolutionDate(date)}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    inputFormat="yyyy-MM-dd"
                  />
              </LocalizationProvider>
            </Grid>
          </Grid>  
          </DialogContent>
         <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSafetyIssue} variant="contained">确认处理</Button>
         </DialogActions>
        </Dialog>
         )}
      </div>
  );
};

