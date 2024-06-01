import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, CircularProgress, Alert } from "@mui/material";
import useFetchData from '../hooks/useFetchData.js';

export default function BasicPie({ pjID }) {
  const { data, error } = useFetchData(`http://47.123.7.53:8000/projectnode/collect/${pjID}/`);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={275}>
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
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: data.completed_count, label: '已完成' },
              { id: 1, value: data.in_progress_count, label: '进行中' },
              { id: 2, value: data.pending_count, label: '未处理' },
            ],
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            cx: 150,
            cy: 150,
          },
        ]}
        width={400}
        height={275}
      />
    </Box>
  );
}
