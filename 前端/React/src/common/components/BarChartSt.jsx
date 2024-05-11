import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function StackBar() {
  return (
    <BarChart
    xAxis={[{ scaleType: 'band', data: ['第一季度', '第二季度', '第三季度','第四季度'] }]}
      series={[
        { data: [10, 15, 13, 8], stack: 'A', label: '检测合格' },
        { data: [4, 3, 1, 2], stack: 'A', label: '一般质量问题' },
        { data: [0, 1,1, 0], stack: 'A', label: '重大质量问题' },
      ]}
      width={500}
      height={350}
    />
  );
}
