import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, CircularProgress, Alert } from '@mui/material';
import useFetchData from '../hooks/useFetchData.js';

export default function StackBar({ projectId }) {
  const { data, error } = useFetchData(`http://47.123.7.53:8000/quality/collect/${projectId}/`);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={350}>
        <CircularProgress />
      </Box>
    );
  }

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const series = Object.keys(data).map((key) => ({
    label: key,
    data: data[key],
    stack: 'stack',  // 添加堆叠属性
  }));

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: quarters }]}
      series={series}
      width={500}
      height={350}
    />
  );
}
