import React, { useState} from 'react';
import Modal from "react-modal";
import axios from 'axios';
import { Typography, Grid,  TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import TimePicker from '../components/TimePicker';
import InputBox from '../components/InputBox';
import InputBoxML from '../components/InputBoxML.jsx';
import TopBar from "../components/TopBar.jsx";
import SaveButton from '../components/SaveButton';

Modal.setAppElement("#root");

export default function CreateQuality  ({ onClose, templates, projectId })  {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [report, setReport] = useState({
    qrname: '',
    qrpart: '',
    qrperson: '',
    qrcons_date: '',
    qrins_date: '',
    qrnumber: '',
    qrsubitems: [],
    qrfeedback:'',
    qrevaluation:'',
  });

   //选择模板
   const handleTemplateChange = (e) => {
    const templateId = parseInt(e.target.value);
    const template = templates.find(t => t.id === templateId);

    if (template) {
      setSelectedTemplate(template);
      setReport({ 
        ...report, 
        qrname:template.name,
        qrsubitems: template.items.map(item => ({ ...item, result: '' })) });
    } else {
      console.error(`Template with ID ${templateId} not found`);
      setSelectedTemplate(null);
      setReport({ ...report, qrsubitems: [] });
    }
  };
  //输入值
  const handleChange = (value, fieldName) => {
    if (fieldName === 'qrsubitems') {
      const updatedSubItems = [...report.qrsubitems];
      updatedSubItems[value.index][value.field] = value.target.value;
      setReport({ ...report, qrsubitems: updatedSubItems });
    } else {
      setReport({ ...report, [fieldName]: value.target ? value.target.value : value });
    }
  };


  //保存到后端
  const handleSubmit = async () => {
    try {
      await axios.post(`http://47.123.7.53:8000/quality/report/add/${projectId}`, report);
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{ content: { width: '60%', height: '80%', margin: 'auto' } }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 顶部栏，显示页面标题，并提供关闭按钮 */}
        <TopBar title="新建质量检验报告" close={onClose}/>
        <Grid container direction="column" spacing={2} marginTop={2}>
          {/*模板选择框 */}
          <Grid item container>
            <TextField
              select
              label="选择模板"
              fullWidth
              value={selectedTemplate ? selectedTemplate.id : ''}
              onChange={handleTemplateChange}
              SelectProps={{
                native: true,
              }}
              sx={{ marginBottom: 2 }}
            >
              <option value="" disabled></option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </TextField>
          </Grid>
          {/*基本信息*/}
          <Grid item container spacing={1}>
            <Grid item xs={6}>
              <InputBox label="工程名称" value={report.qrname} onChange={(e) => handleChange(e, 'qrname')} />
            </Grid>
            <Grid item xs={6}>
              <InputBox label="检验部位及编号" value={report.qrpart} onChange={(e) => handleChange(e, 'qrpart')} />
            </Grid>
            <Grid item xs={6}>
              <InputBox label="质检员" value={report.qrperson} onChange={(e) => handleChange(e, 'qrperson')} />
            </Grid>
            <Grid item xs={6}>
              <TimePicker label="施工时间" value={report.qrcons_date} onChange={(e) => handleChange(e, 'qrcons_date')} />
            </Grid>
            <Grid item xs={6}>
              <TimePicker label="检验时间" value={report.qrins_date} onChange={(e) => handleChange(e, 'qrins_date')} />
            </Grid>
            <Grid item xs={6}>
              <InputBox label="报告编号" value={report.qrnumber} onChange={(e) => handleChange(e, 'qrnumber')} />
            </Grid>
          </Grid> 
          {/*检验子项目*/}
          <Grid item container >
            <Grid item container direction="row">
              <Grid item xs={1}></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>检验项目*</Typography></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>规定值或允许偏差*</Typography></Grid>
              <Grid item xs={3}><Typography sx={{ textAlign: "center" }}>检验结果</Typography></Grid>
            </Grid>
            {report.qrsubitems.map((subItem, index) => (
              <Grid item container spacing={2} key={index} alignItems="center" marginBottom={1}>
                <Grid item xs={1} alignContent="center" >
                  <Typography sx={{ textAlign: "center" }}>{index+1}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    value={subItem.NAME_Item}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    value={subItem.VALUE_Item}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    value={subItem.result}
                    onChange={(e) => handleChange({ target: { value: e.target.value, index, field: 'result' } }, 'qrsubitems')}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/*其他信息*/}
          <Grid item container justifyContent="flex-start" alignContent="flex-start">
            <Grid item container xs={6}>
              <InputBoxML label="质检员意见" value={report.qrfeedback} onChange={(e) => handleChange(e, 'qrfeedback')} />
            </Grid>
            <Grid item container xs={6} direction={"column"}>
              <Grid item><Typography >总体情况</Typography></Grid>
              <Grid item container >
                <RadioGroup
                  row
                  aria-label="overallQuality"
                  name="overallQuality"
                  value={report.qrevaluation}
                  onChange={(e) => handleChange(e, 'qrevaluation')} 
                >
                  <FormControlLabel value="qualified" control={<Radio />} label="合格" />
                  <FormControlLabel value="minorIssue" control={<Radio />} label="一般质量问题" />
                  <FormControlLabel value="majorIssue" control={<Radio />} label="重大质量问题" />
                </RadioGroup>
              </Grid>
              <Grid item container justifyContent="flex-end"> <SaveButton onClick={handleSubmit}>提交报告</SaveButton></Grid>
            </Grid>
          </Grid> 
        </Grid>
      </div>
    </Modal>
  );
};


