import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Radio, RadioGroup, FormControlLabel, IconButton } from "@mui/material";
import { Timeline } from "antd";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function TimeLineWithAdd ({pjID}) {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // 控制对话框的打开和关闭
  const [newEvent, setNewEvent] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState(null);
  const [newEventStatus, setNewEventStatus] = useState("未处理"); // 默认状态为 "未处理"
  const [anchorEl, setAnchorEl] = useState(null); // 菜单的锚元素
  const [selectedNodeId, setSelectedNodeId] = useState(null); // 存储选择的节点ID
  const [selectedNodeStatus, setSelectedNodeStatus] = useState(""); // 存储选择的节点ID
  
  //获取节点列表
  useEffect(() => { 
    fetchEvents(); 
  }, [pjID]);

  const fetchEvents = () => {
    if (!pjID) return;
    axios
      .get(`http://47.123.7.53:8000/projectnode/list/${pjID}/`)
      .then((res) => {
        if (res.data && res.data.project_nodes) {
          const eventData = res.data.project_nodes.map((node) => ({
            eventid:node.pjn_id,
            eventname: node.pjn_name,
            eventdescription: node.pjn_des,
            eventdate: dayjs(node.pjn_ddl),
            eventstatus: node.pjn_status,
          }));
          // 对事件按照日期进行排序
          eventData.sort((a, b) => a.eventdate - b.eventdate);
          setEvents(eventData);
        } else {
          console.error("Invalid response data:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  //打开创建节点弹窗
  const handleOpenDialog = () => {
    setOpen(true);
  };
  // 关闭创建节点弹窗
  const handleCloseDialog = () => {
    setOpen(false);
    // 清空输入框中的内容
    setNewEvent("");
    setNewEventDescription("");
    setNewEventDate(null);
    setNewEventStatus("未处理");
      // 关闭对话框后重新获取节点列表
    fetchEvents();
  };
  // 新建节点
  const handleSaveEvent = async () => {
    if (
      newEvent.trim() === "" ||
      newEventDescription.trim() === "" ||
      !newEventDate
    ) {
      return;
    }
    const newEventData = {
      pjn_name: newEvent,
      pjn_des: newEventDescription,
      pjn_ddl: dayjs(newEventDate).format('YYYY-MM-DD'), // 格式化日期为 'YYYY-MM-DD'
      pjn_status: newEventStatus,
      pj_id: pjID,
    };
    try {
      await axios.post(
        "http://47.123.7.53:8000/projectnode/add/",
        newEventData
      );
      handleCloseDialog();
      fetchEvents(); 
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  // 打开菜单
  const handleMenuOpen = (event, eventId, eventStatus) => {
    setSelectedNodeId(eventId);
    setSelectedNodeStatus(eventStatus);
    setAnchorEl(event.currentTarget);
  };

  // 关闭菜单
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 处理删除节点
  const handleDelete = async () => {
    console.log("deleteNodeId:", selectedNodeId); // 打印删除节点的 id 信息
    try {
      await axios.post("http://47.123.7.53:8000/projectnode/delete/", { pjn_id: selectedNodeId });
      // 删除成功后重新获取事件列表
      fetchEvents();
    } catch (error) {
      console.error("删除事件出错:", error);
    }
    // 关闭菜单
    handleMenuClose();
  };

  // 处理修改节点
  const handleStatusChange = (newStatus) => {
    axios
      .post(`http://47.123.7.53:8000/projectnode/update/phen/${selectedNodeId}/`, { new_pjn_status: newStatus })
      .then(() => {
        handleMenuClose();
        fetchEvents(); 
      })
      .catch((error) => {
        console.error("Error updating event status", error);
        handleMenuClose();
      });
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
              <IconButton onClick={(e) => handleMenuOpen(e, event.eventid, event.eventstatus)}>
                <MoreVertIcon />
              </IconButton>
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
              renderInput={(params) => <TextField {...params} size="small" fullWidth margin="normal" 
              inputFormat="yyyy-MM-dd"/>}
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
      {/* 菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
      {selectedNodeStatus === "未处理" && (
        <MenuItem onClick={() => handleStatusChange("进行中")}>
          标记为进行中
        </MenuItem>
      )}
      {selectedNodeStatus === "进行中" && (
        <MenuItem onClick={() => handleStatusChange("已完成")}>
          标记为已完成
        </MenuItem>
      )}
        <MenuItem onClick={handleDelete}>删除节点</MenuItem>
      </Menu>
    </Grid>
  );
};

