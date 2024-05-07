import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from "@mui/material";

export default function BasicPie({pjID}) {
  const [statusData, setStatusData] = useState(null);

  const getPiechartData = async () => {
    try{
      const response = await axios.get(`http://47.123.7.53:8000/pjnode_piechart/${pjID}/`);
        setStatusData(response.data);
      }catch(error) {
      console.error("Error getting Piechart Status Data:", error);
      }
  }
  useEffect(()=>{
    getPiechartData()
  },[pjID])

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
      {statusData ? (
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: statusData.completed_count, label: '已完成' },
                            { id: 1, value: statusData.in_progress_count, label: '进行中' },
                            { id: 2, value: statusData.pending_count, label: '未处理' },
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
        ) : (
            <div>Loading...</div>
        )}
    </Box>
  );
}
