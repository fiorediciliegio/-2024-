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
    { id: "pjname", /*对应 后端返回数据的属性名 */
    label: "项目名称", 
    minWidth: 170 },
    {
      id:'pjnumber',
      label: "项目编号",
      minWidth: 100,
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
  
  export const projectlist = [
    {
      label: "第一个项目",
      value: "第一个项目",
    },
    {
      label: "第二个项目",
      value: "第二个项目",
    },
    {
      label: "第三个项目",
      value: "第三个项目",
    },
    {
      label: "第四个项目",
      value: "第四个项目",
    },
  ];
  