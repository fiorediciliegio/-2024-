import React, { useState } from "react";
import InputBox from "../components/InputBox.jsx";
import SelectBox from "../components/SelectBox.jsx";
import InputBoxML from "../components/InputBoxML.jsx";
import CommonCreate from "./CommonCreate";
import { personroles } from "../constants/PERSON_INFO.js";
import useFormSubmit from '../hooks/useFormSubmit.js';

export default function CreatePerson({ onClose }) {
  const [personInfo, setPersonInfo] = useState({
    pername: "",
    pernumber: "",
    perrole: "",
    permail: "",
    perdescription: "",
  });

  const handleChange = (value, fieldName) => {
    let fieldValue = value.target.value;
    setPersonInfo({ ...personInfo, [fieldName]: fieldValue });
  };

  const { handleSubmit, loading, error } = useFormSubmit();

  const fields = [
    { component: <InputBox label="姓名" value={personInfo.pername} onChange={(event) => handleChange(event, "pername")} />, width: 6 },
    { component: <InputBox label="编号" value={personInfo.pernumber} onChange={(event) => handleChange(event, "pernumber")} />, width: 6 },
    { component: <InputBox label="邮箱" value={personInfo.permail} onChange={(event) => handleChange(event, "permail")} />, width: 6 },
    { component: <SelectBox set={personroles} label="职位" value={personInfo.perrole} onChange={(event) => handleChange(event, "perrole")} width="25ch" />, width: 6 },
    { component: <InputBoxML label="更多描述" value={personInfo.perdescription} onChange={(event) => handleChange(event, "perdescription")} />, width: 12 },
  ];

  const onSubmit = () => handleSubmit(personInfo, "http://47.123.7.53:8000/person/add/", onClose);

  return(
    <CommonCreate title="创建项目" fields={fields} onClose={onClose} onSubmit={onSubmit} >
        {loading && <p>正在提交...</p>}
        {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
      </CommonCreate>
    );
}
