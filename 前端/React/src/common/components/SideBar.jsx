import * as React from "react";
import { Button, ButtonGroup, Box, Typography } from "@mui/material";

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
      window.open("/Document", "_self");
    }}
  >
    文档
  </Button>,
  <Button
    key="6-2"
    onClick={() => {
      window.open("/Drawing", "_self");
    }}
  >
    图纸
  </Button>,
  <Button
    key="6-3" // 修正键值为 "6-3"
    onClick={() => {
      window.open("/Photo", "_self");
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
        flexDirection: "column", // 修改为垂直方向布局
        "& > *": {
          m: 1,
        },
      }}
    >
      {/* Management 标题 */}
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
      >
        Management
      </Typography>
      {/* Management 按钮组 */}
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
      {/* Archive 标题 */}
      <Typography
        variant="h6"
        noWrap
        component="span"
        sx={{
          mt: 2, // 增加上边距
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
      >
        Archive
      </Typography>
      {/* Archive 按钮组 */}
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
