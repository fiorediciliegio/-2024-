import React, { useState } from "react";
import {Grid} from "@mui/material";
import { Timeline,Button, Input } from "antd";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const TimeLineWithAdd = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventDate, setNewEventDate] = useState(null);

  const handleAddEvent = () => {
    if (
      newEvent.trim() === "" ||
      newEventDescription.trim() === "" ||
      !newEventDate
    ) {
      return;
    }
    const updatedEvents = [
      ...events,
      { event: newEvent, description: newEventDescription, date: newEventDate },
    ];
    // Sort events by date
    updatedEvents.sort((a, b) => a.date.valueOf() - b.date.valueOf());
    setEvents(updatedEvents);
    setNewEvent("");
    setNewEventDescription("");
    setNewEventDate(null);
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
              <p>{event.date.toLocaleDateString()}</p>{" "}
              {/* Use toLocaleDateString() to format the date */}
            </Timeline.Item>
          ))}
        </Timeline>
      </Grid>
      <Grid item container spacing={1}>
        <Grid item>
        <Input
          placeholder="节点事件"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          style={{ marginRight: "10px" }}
        /></Grid>
        <Grid item>
        <Input
          placeholder="描述"
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        /></Grid>
        <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker selected={newEventDate}
            onChange={(date) => setNewEventDate(date)} />
        </LocalizationProvider></Grid>
        <Grid item>
        <Button type="primary" onClick={handleAddEvent}>
          添加项目节点
        </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TimeLineWithAdd;
