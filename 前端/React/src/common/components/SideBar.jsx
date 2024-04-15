import * as React from "react";
import { Button, ButtonGroup, Box, Typography } from "@material-ui/core";

const buttons1 = [
  <Button
    key="one"
    onClick={() => {
      window.open("/PlanPage", "_self");
    }}
  >
    项目规划
  </Button>,
  <Button
    key="two"
    onClick={() => {
      window.open("/PersonnelPage", "_self");
    }}
  >
    人力资源
  </Button>,
  <Button
    key="three"
    onClick={() => {
      window.open("/CostPage", "_self");
    }}
  >
    成本控制
  </Button>,
  <Button
    key="four"
    onClick={() => {
      window.open("/QualityPage", "_self");
    }}
  >
    质量监测
  </Button>,
  <Button
    key="five"
    onClick={() => {
      window.open("/SafetyPage", "_self");
    }}
  >
    安全监测
  </Button>,
];
const buttons2 = [
  <Button
    key="6-1"
    onClick={() => {
      window.open("https://example.com", "_self");
    }}
  >
    文档
  </Button>,
  <Button
    key="6-2"
    onClick={() => {
      window.open(url, "_self");
    }}
  >
    图纸
  </Button>,
  <Button
    key="t6-3"
    onClick={() => {
      window.open(url, "_self");
    }}
  >
    照片
  </Button>,
];
export default function SideBar() {
  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
      >
        Management
      </Typography>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        color="primary"
        size="large"
        fullWidth
      >
        {buttons1}
      </ButtonGroup>
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
      >
        Archive
      </Typography>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        color="primary"
        size="large"
        fullWidth
      >
        {buttons2}
      </ButtonGroup>
    </Box>
  );
}
