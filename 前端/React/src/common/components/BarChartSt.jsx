import React, {useEffect, forwardRef, useImperativeHandle} from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, CircularProgress, Alert } from '@mui/material';
import useFetchData from '../hooks/useFetchData.js';

const StackBar = forwardRef((props,ref) => {
  const { data, error, fetchData } = useFetchData(`http://47.123.7.53:8000/quality/collect/${props.projectId}/`);
  useEffect(() => {
    fetchData();
  }, []);
  
  // 使用 useImperativeHandle 向父组件暴露刷新数据的方法
   useImperativeHandle(ref, () => ({
    refreshData() {
      fetchData();
    }
  }));

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
});
export default StackBar;
