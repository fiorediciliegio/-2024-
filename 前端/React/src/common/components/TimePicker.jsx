import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "/src/styles.css"; // 引入自定义样式文件

export default function TimePicker({ title, value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null,
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div>
      <h4>{title}</h4>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="custom-datepicker"
      />
    </div>
  );
}
