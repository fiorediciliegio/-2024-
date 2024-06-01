import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, CircularProgress, Alert } from '@mui/material';
import useFetchData from '../hooks/useFetchData.js';

export default function StackBar({projectId}) {
  const { data, error } = useFetchData(`http://47.123.7.53:8000/quality/collect/${projectId}/`);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={350}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.quarters }]}
      series={data.series}
      width={500}
      height={350}
    />
  );
}
