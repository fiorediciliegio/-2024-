import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: '人员数量（名）',
    },
  ],
  width: 500,
  height: 400,
  margin: { bottom: 60, left: 75, right: 5 },
};

export default function BasicBarH({ pjID }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://47.123.7.53:8000/person/project/collect/${pjID}/`);
        const data = response.data;

        // 转换数据格式为数组
        const chartDataArray = Object.entries(data).map(([name, value]) => ({
          role: name,
          人员数量: value,
        }));

        setChartData(chartDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pjID]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <BarChart
        dataset={chartData}
        yAxis={[
          {
            scaleType: 'band',
            dataKey: 'role',
          }
        ]}
        series={[{ dataKey: '人员数量', label: '人员数量' }]}
        layout="horizontal"
        {...chartSetting}
      />
    </Box>
  );
}
