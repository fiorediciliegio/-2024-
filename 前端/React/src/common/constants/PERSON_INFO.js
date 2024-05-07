export const personroles = [
    {
      value: "项目经理",
      label: "项目经理",
    },
    {
      value: "工程师",
      label: "工程师",
    },
    {
      value: "施工员",
      label: "施工员",
    }, 
    {
      value: "财务人员",
      label: "财务人员",
    },
    {
      value: "安全主管",
      label: "安全主管",
    },
    {
      value: "质量控制员",
      label: "质量控制员",
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
  