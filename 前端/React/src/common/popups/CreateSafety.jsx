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
    const template = templates.find(t => t.id === e.target.value);
    setSelectedTemplate(template);
    setReport({ ...report, qrsubitems: template.subitems });
  };
  //输入值
  const handleChange = (value, fieldName) => {
    setReport({ ...report, [fieldName]: value.target ? value.target.value : value });
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
              <InputBox label="质检人" value={report.qrperson} onChange={(e) => handleChange(e, 'qrperson')} />
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
          <Grid item container>
              <Typography variant="h6">检验项目</Typography>
              {report.qrsubitems.map((subItem, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      label="检验项目"
                      fullWidth
                      value={subItem.name}
                      onChange={(e) => handleChange({ target: { value: e.target.value, index, field: 'name' } })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="规定值或允许偏差"
                      fullWidth
                      value={subItem.requirement}
                      onChange={(e) => handleChange({ target: { value: e.target.value, index, field: 'requirement' } })}
                    />
                  </Grid>
                </Grid>
              ))}
          </Grid>
          {/*其他信息*/}
          <Grid item container>
            <Grid item xs={6}>
              <InputBoxML label="质检员意见" value={report.qrfeedback} onChange={(e) => handleChange(e, 'qrfeedback')} /></Grid>
            <Grid item container xs={6} spacing={2}>
              <Typography variant="h6">总体情况</Typography>
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
          </Grid> 
          <Grid item xs={12} container justifyContent="center">
            <SaveButton onClick={handleSubmit}>保存</SaveButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};


