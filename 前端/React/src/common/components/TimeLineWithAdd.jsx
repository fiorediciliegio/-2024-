import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, IconButton } from "@mui/material";
import { Timeline } from "antd";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // 导入 dayjs 库
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function TimeLineWithAdd ({pjID}) {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // 控制对话框的打开和关闭
  const [newEvent, setNewEvent] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState(null);
  const [newEventStatus, setNewEventStatus] = useState("未处理"); // 默认状态为 "未处理"

//获取节点列表
  useEffect(() => {
    if (!pjID) return; // 如果没有 pjID，则不发送请求

    axios
    .get(`http://47.123.7.53:8000/projectnode/list/${pjID}/`)
    .then((res) => {
      const eventData = res.data.map(item => ({
        eventname: item.pjn_name,
        eventdescription: item.pjn_des,
        eventdate:item.pjn_ddl,
        eventstatus: item.pjn_status
      }));
      setEvents(eventData);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
}, [{pjID}]);


  //打开创建节点弹窗
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    // 清空输入框中的内容
    setNewEvent("");
    setNewEventDescription("");
    setNewEventDate(null);
    setNewEventStatus("未处理");
  };
  //新建节点
  const handleSaveEvent= async () => {
    if (
      newEvent.trim() === "" ||
      newEventDescription.trim() === "" ||
      !newEventDate
    ) {
      return;
    }
    try {
      const response = await axios.post('http://47.123.7.53:8000/projectnode/add/', { // 发送POST请求将新创建的节点信息发送到后端
        pjn_name: newEvent,
        pjn_des: newEventDescription,
        pjn_ddl: newEventDate,
        pjn_status: newEventStatus,
        pj_id:pjID,
      });
      const updatedEvents = [...events, response.data]; // 将新创建的节点信息添加到时间轴数据中
      // 对事件按照日期排序
      updatedEvents.sort((a, b) => dayjs(a.eventdate).valueOf() - dayjs(b.eventdate).valueOf());
      setEvents(updatedEvents);
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item container>
        <Timeline>
          {events.map((event, index) => (
            <items key={index}>
              <p>{event.eventname}</p>
              <p>{event.eventdescription}</p>
              <p>{dayjs(event.eventdate).format('YYYY-MM-DD')}</p> {/* 使用 dayjs 格式化日期 */}
              <p>Status: {event.eventstatus}</p> {/* 显示状态 */}
            </items>
          ))}
        </Timeline>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <IconButton onClick={handleOpenDialog}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>创建节点</DialogTitle>
        <DialogContent>
          <TextField
            label="节点事件"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            size="small"
            fullWidth
            margin="normal"
          />
          <TextField
            multiline
            label="描述"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            size="small"
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={newEventDate}
              onChange={(date) => setNewEventDate(date)}
              renderInput={(params) => <TextField {...params} size="small" fullWidth margin="normal" />}
            />
          </LocalizationProvider>
          <RadioGroup
            row
            value={newEventStatus}
            onChange={(e) => setNewEventStatus(e.target.value)}
          >
            <FormControlLabel value="未处理" control={<Radio />} label="未处理" />
            <FormControlLabel value="进行中" control={<Radio />} label="进行中" />
            <FormControlLabel value="已完成" control={<Radio />} label="已完成" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSaveEvent} variant="contained" autoFocus>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

