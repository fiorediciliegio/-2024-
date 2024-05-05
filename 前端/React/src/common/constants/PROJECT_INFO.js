export const projecttype = [
    {
      value: "私人建筑",
      label: "私人建筑",
    },
    {
      value: "公共建筑",
      label: "公共建筑",
    },
    {
      value: "桥梁",
      label: "桥梁",
    },
    {
      value: "隧道",
      label: "隧道",
    },
    {
      value: "道路",
      label: "道路",
    },
  ];
  
  export const pjcolumns = [
    { id: "pjname", 
    label: "项目名称", 
    minWidth: 170 },
    {
      id:'pjnumber',
      label: "项目编号",
      minWidth: 170,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "pjtype",
      label: "类型",
      minWidth: 170,
    },
    {
      id: "pjmanager",
      label: "负责人",
      minWidth: 170,
    },
  ];
  
 