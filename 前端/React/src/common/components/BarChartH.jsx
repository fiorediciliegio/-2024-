import React from 'react';
import { Box, CircularProgress, Alert } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import useFetchData from '../hooks/useFetchData.js';

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
  const { data, error } = useFetchData(`http://47.123.7.53:8000/person/project/collect/${pjID}/`);

  // 转换数据格式为数组
  const chartData = Object.entries(data).map(([name, value]) => ({
    role: name,
    人员数量: value,
  }));

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

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
