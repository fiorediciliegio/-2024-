import React, { useState } from "react";
import { Timeline, Button, Input } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div>
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
      <div style={{ marginTop: "20px" }}>
        <Input
          placeholder="Event"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Input
          placeholder="Description"
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <DatePicker
          selected={newEventDate}
          onChange={(date) => setNewEventDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Date"
          style={{ marginRight: "10px" }}
        />
        <Button type="primary" onClick={handleAddEvent}>
          添加项目节点
        </Button>
      </div>
    </div>
  );
};

export default TimeLineWithAdd;
