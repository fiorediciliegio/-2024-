import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import {Paper,Grid} from '@mui/material';

const settings1 = {
  width: 200,
  height: 200,
  value: 60,
  startAngle:-110,
  endAngle:110,
};
const settings2 = {
  width: 120,
  height: 120,
  value: 60,
  startAngle:-110,
  endAngle:110,
};

export default function GaugChart() {
  return (
    <Paper style={{ width: "100%", height: "100%", padding: "15px" }}>
      <Grid container direction={"column"}>
        {/*总造价*/}
        <Grid item container xs={12} justifyContent="center"> 
          <Gauge
            {...settings1}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
        </Grid>
        {/*第一行*/}
        <Grid item container direction="row" spacing={1}>
        <Gauge
            {...settings2}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
          <Gauge
            {...settings2}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
          <Gauge
            {...settings2}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
        </Grid>
        {/*第二行*/}
        <Grid item container direction="row" spacing={1}>
        <Gauge
            {...settings2}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
          <Gauge
            {...settings2}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
