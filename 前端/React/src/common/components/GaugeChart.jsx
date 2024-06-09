import * as React from 'react';
import { Box, Paper, Grid, CircularProgress, Alert } from '@mui/material';
import GaugeItem from '../components/GaugeItem.jsx';
import useFetchData from '../hooks/useFetchData.js';

export default function GaugeChart({ projectId }) {
  const { data, error} = useFetchData(`http://47.123.7.53:8000/cost/collect/total/${projectId}/`);

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
  // 计算总费用比例并格式化 ratio
  const totalCostRatio = (data.TotalCost / data.TotalBudget) * 100;
  const totalCostRatioStr = `${data.TotalCost}/${data.TotalBudget}`;

  return (
    <Grid container margin={1}>
      <Paper style={{ width: "100%", height: "100%", padding: "15px" }} >
        <Grid container direction={"column"}>
          {/* 总造价 */}
          <Grid item container xs={12} justifyContent="center">
            <GaugeItem
              size="large" label="总费用" value={totalCostRatio} ratio={totalCostRatioStr}
            />
          </Grid>
          {/* 子项 */}
          <Grid item container justifyContent={"space-between"}>
          {Object.entries(data.detail).map(([expenseType, { totalbudget, totalcost }]) => (
            <Grid key={expenseType} item container justifyContent="center" xs={4}>
              <GaugeItem
                size="small" label={expenseType} value={(totalcost / totalbudget) * 100}
                ratio={`${totalcost}/${totalbudget}`}
              />
            </Grid>
          ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
