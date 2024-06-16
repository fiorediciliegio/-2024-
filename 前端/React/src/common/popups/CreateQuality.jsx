import React, { useState } from 'react';
import Modal from "react-modal";
import { Typography, Grid, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import TimePicker from '../components/TimePicker';
import InputBox from '../components/InputBox';
import InputBoxML from '../components/InputBoxML.jsx';
import CommonCreate from "./CommonCreate";
import useFormSubmit from '../hooks/useFormSubmit.js';

Modal.setAppElement("#root");

export default function CreateQuality({ onClose, templates, projectId }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [report, setReport] = useState({
    qrname: '',
    qrpart: '',
    qrperson: '',
    qrcons_date: '',
    qrins_date: '',
    qrnumber: '',
    qrsubitems: [{ name: '', requirement: '', result: '' }],
    qrfeedback: '',
    qrevaluation: '',
  });

  //选择模板
  const handleTemplateChange = (e) => {
    const templateId = parseInt(e.target.value);
    const template = templates.find(t => t.id === templateId);

    if (template) {
      setSelectedTemplate(template);
      setReport({
        ...report,
        qrname: template.name,
        qrsubitems: template.items.map(item => ({ name: item.NAME_Item, requirement: item.VALUE_Item, result: '' }))
      });
    } else {
      console.error(`Template with ID ${templateId} not found`);
      setSelectedTemplate(null);
      setReport({ ...report, qrsubitems: [] });
    }
  };

  //输入值
  const handleChange = (value, fieldName, index) => {
    if (fieldName === 'qrsubitems') {
      setReport(prevReport => ({
        ...prevReport,
        qrsubitems: prevReport.qrsubitems.map((item, idx) => {
          if (idx === index) {
            return { ...item, [value.field]: value.target.value };
          }
          return item;
        })
      }));
    } else {
      setReport(prevReport => ({ ...prevReport, [fieldName]: value.target ? value.target.value : value }));
    }
  };

  //保存到后端
  const { handleSubmit, loading, error } = useFormSubmit();

  // 构建 fields 数组
  const fields = [
    {
      component: (
        <TextField
          select
          label="选择模板"

          value={selectedTemplate ? selectedTemplate.id : ''}
          onChange={handleTemplateChange}
          SelectProps={{
            native: true,
          }}
        >
          <option value="" disabled></option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </TextField>
      ),
      width: 12},
    {component: (
        <InputBox label="工程名称" value={report.qrname} onChange={(e) => handleChange(e, 'qrname')} />
      ),
      width: 6},
    {component: (
        <InputBox label="检验部位及编号" value={report.qrpart} onChange={(e) => handleChange(e, 'qrpart')} />
      ),
      width: 6},
    {component: (
        <InputBox label="质检员" value={report.qrperson} onChange={(e) => handleChange(e, 'qrperson')} />
      ),
      width: 6},
    {component: (
        <TimePicker label="施工时间" value={report.qrcons_date} onChange={(e) => handleChange(e, 'qrcons_date')} />
      ),
      width: 6},
    {component: (
        <TimePicker label="检验时间" value={report.qrins_date} onChange={(e) => handleChange(e, 'qrins_date')} />
      ),
      width: 6},
    {component: (
        <InputBox label="报告编号" value={report.qrnumber} onChange={(e) => handleChange(e, 'qrnumber')} />
      ),
      width: 6},
      {component: (
        <Grid item container direction="row" >
              <Grid item xs={1}></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>检验项目*</Typography></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>规定值或允许偏差*</Typography></Grid>
              <Grid item xs={3}><Typography sx={{ textAlign: "center" }}>检验结果</Typography></Grid>
            </Grid>
      ),
      width: 12},
    ...report.qrsubitems.map((subItem, index) => ({
      component: (
        <Grid item container spacing={2} key={index} alignItems="center"  >
          <Grid item xs={1} alignContent="center">
            <Typography sx={{ textAlign: "center" }}>{index + 1}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={subItem.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={subItem.requirement}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              value={subItem.result}
              onChange={(e) => handleChange({ target: { value: e.target.value }, field: 'result' }, 'qrsubitems', index)}
            />
          </Grid>
        </Grid>
      ),
      width: 12
    })),
    {
      component: (
        <InputBoxML label="质检员意见" value={report.qrfeedback} onChange={(e) => handleChange(e, 'qrfeedback')} />
      ),
      width: 6
    },
    {
      component: (
        <>
          <Typography>总体情况</Typography>
          <RadioGroup
            row
            aria-label="overallQuality"
            name="overallQuality"
            value={report.qrevaluation}
            onChange={(e) => handleChange(e, 'qrevaluation')}
          >
            <FormControlLabel value="合格" control={<Radio />} label="合格" />
            <FormControlLabel value="一般质量问题" control={<Radio />} label="一般质量问题" />
            <FormControlLabel value="重大质量问题" control={<Radio />} label="重大质量问题" />
          </RadioGroup>
        </>
      ),
      width: 6
    },
  ];
  const onSubmit = () => handleSubmit(report, `http://47.123.7.53:8000/quality/report/add/${projectId}/`, onClose);

  return( 
  <CommonCreate title="新建质量检验报告" fields={fields} onClose={onClose} onSubmit={onSubmit} >
    {loading && <p>正在提交...</p>}
    {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
  </CommonCreate>
  );
}
