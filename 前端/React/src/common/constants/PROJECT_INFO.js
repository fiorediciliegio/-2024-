export const projecttype = [
  {
    value: "USD",
    label: "私人建筑",
  },
  {
    value: "EUR",
    label: "公共建筑",
  },
  {
    value: "BTC",
    label: "桥梁",
  },
  {
    value: "JPY",
    label: "隧道",
  },
  {
    value: "JPY",
    label: "道路",
  },
];

export const pjcolumns = [
  { id: "name", label: "项目名称", minWidth: 170 },
  {
    id: "code",
    label: "项目编号",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "类型",
    minWidth: 170,
  },
  {
    id: "manager",
    label: "负责人",
    minWidth: 170,
  },
  {
    id: "createdate",
    label: "创建日期",
    minWidth: 170,
    format: (value) => value.toLocaleString(),
  },
];
