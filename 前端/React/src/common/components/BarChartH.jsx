import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: '人员数量（名）',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [{
    人员数量: 1,
    role: '项目经理',
  },
  {
    人员数量: 1,
    role: '工程师',
  },
  {
    人员数量: 20,
    role: '施工员',
  },
  {
    人员数量: 4,
    role: '财务人员',
  },
  {
    人员数量: 2,
    role: '安全主管',
  },
  {
    人员数量: 6,
    role: '质量控制员',
  }
];

const valueFormatter = (value) => `${value}mm`;

export default function BasicBar() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'role' }]}
      series={[{ dataKey: '人员数量', label: '项目人员分类', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
