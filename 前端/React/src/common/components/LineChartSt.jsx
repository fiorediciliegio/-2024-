import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, CircularProgress, Alert, Grid,Typography } from '@mui/material';
import useFetchData from '../hooks/useFetchData.js';

const keyToLabel = {
  material: '材料费用',
  equipment: '设备费用',
  labour: '人工费用 ',
  manage: '管理费用',
  tax: '规费税金',
  other: '其他费用',
};

const colors = {
  material: '#1f77b4',  // blue
  equipment: '#ff7f0e', // orange
  labour: '#2ca02c',    // green
  manage: '#d62728',    // red
  tax: '#9467bd',       // purple
  other: '#8c564b',     // brown
};

const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none',
};

const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
};

export default function LineChartSt({projectId}) {
  const { data, error } = useFetchData(`http://47.123.7.53:8000/cost/collect/monthly/${projectId}/`);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  // 创建包含 1-12 月的基准数组
  const baseData = Array.from({ length: 12 }, (_, i) => ({
    month: (i + 1).toString(),
    material: 0,
    equipment: 0,
    labour: 0,
    manage: 0,
    tax: 0,
    other: 0,
  }));
  // 将后端返回的数据映射到基准数组中
  data.forEach(item => {
    const monthIndex = new Date(item.month).getMonth(); // 获取月份索引 (0-11)
    baseData[monthIndex] = {
      month: (monthIndex + 1).toString(),
      material: item.material,
      equipment: item.equipment,
      labour: item.labour,
      manage: item.manage,
      tax: item.tax,
      other: item.other,
    };
  });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent={"center"}>
        <Typography variant='h6'>月度执行费用统计</Typography>
      </Grid>
      <Grid item >
        <LineChart
          xAxis={[
            {
              dataKey: 'month',
              valueFormatter:(value) => `${value}月`,
              min: 1,
              max: 12,
            },
          ]}
          series={Object.keys(keyToLabel).map((key) => ({
            dataKey: key,
            label: keyToLabel[key],
            color: colors[key],
            showMark: false,
            ...stackStrategy,
          }))}
          dataset={baseData}
          {...customize}
        />
      </Grid>
    </Grid>
  );
}
