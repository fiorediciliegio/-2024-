import React, { useState } from "react";
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, IconButton } from "@mui/material";
import { Timeline } from "antd";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // 导入 dayjs 库
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TimeLineWithAdd = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // 控制对话框的打开和关闭
  const [newEvent, setNewEvent] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState(null);
  const [newEventStatus, setNewEventStatus] = useState("未处理"); // 默认状态为 "未处理"

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

  const handleSaveEvent = () => {
    if (
      newEvent.trim() === "" ||
      newEventDescription.trim() === "" ||
      !newEventDate
    ) {
      return;
    }

    // 将 newEventDate 转换为标准的 JavaScript 日期对象
    const dateObject = dayjs(newEventDate).toDate();

    const updatedEvents = [
      ...events,
      { event: newEvent, description: newEventDescription, date: dateObject, status: newEventStatus },
    ];
    // Sort events by date
    updatedEvents.sort((a, b) => a.date.valueOf() - b.date.valueOf());
    setEvents(updatedEvents);
    handleCloseDialog();
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
            <Timeline.Item key={index}>
              <p>{event.event}</p>
              <p>{event.description}</p>
              <p>{dayjs(event.date).format('YYYY-MM-DD')}</p> {/* 使用 dayjs 格式化日期 */}
              <p>Status: {event.status}</p> {/* 显示状态 */}
            </Timeline.Item>
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

export default TimeLineWithAdd;
