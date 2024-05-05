export const personroles = [
    {
      value: "项目经理",
      label: "项目经理",
    },
    {
      value: "施工人员",
      label: "施工人员",
    },
    {
      value: "监理人员",
      label: "监理人员",
    },
    {
      value: "会计人员",
      label: "会计人员",
    },
  ];

  export const percolumns = [
    { id: "pername", 
    label: "姓名", 
    minWidth: 170 },
    {
      id:'pernumber',
      label: "人员编号",
      minWidth: 170,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "perrole",
      label: "职位",
      minWidth: 170,
    },
    {
      id: "permail",
      label: "邮箱",
      minWidth: 170,
    },
  ];
  