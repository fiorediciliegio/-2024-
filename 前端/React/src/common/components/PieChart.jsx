import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from "@mui/material";

export default function BasicPie() {
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
              { id: 0, value: 10, label: '已完成' },
              { id: 1, value: 15, label: '进行中' },
              { id: 2, value: 20, label: '未处理' },
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
