import React from "react";
import { Timeline as AntTimeline } from "antd";

const TimelineItem = ({ date, title, description, status }) => {
  return (
    <div>
      <p>{date}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{status}</p>
    </div>
  );
};

export default function MilestoneLine({ items }) {
  return (
    <AntTimeline mode="left">
      {items.map((item, index) => (
        <AntTimeline.Item key={index}>
          <TimelineItem
            date={item.date}
            title={item.title}
            description={item.description}
            status={item.status}
          />
        </AntTimeline.Item>
      ))}
    </AntTimeline>
  );
}
