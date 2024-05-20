import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Typography, Grid, Box, TextField } from '@mui/material';
import TimePicker from '../components/TimePicker';
import InputBox from '../components/InputBox';
import SaveButton from '../components/SaveButton';

const CreateQuality = ({ onClose }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [report, setReport] = useState({
    qrname: '',
    qrpart: '',
    qrperson: '',
    qrcons_date: '',
    qrins_date: '',
    qrnumber: '',
    qrsubitems: [],
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await axios.get('http://example.com/api/templates');
    setTemplates(response.data);
  };

  const handleTemplateChange = (e) => {
    const template = templates.find(t => t.id === e.target.value);
    setSelectedTemplate(template);
    setReport({ ...report, qrsubitems: template.subitems });
  };

  const handleChange = (value, fieldName) => {
    setReport({ ...report, [fieldName]: value.target ? value.target.value : value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://example.com/api/reports', report);
      onClose();
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{ content: { width: '60%', height: '90%', margin: 'auto' } }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">Create Quality Report</Typography>
        <TextField
          select
          label="Select Template"
          fullWidth
          value={selectedTemplate ? selectedTemplate.id : ''}
          onChange={handleTemplateChange}
          SelectProps={{
            native: true,
          }}
          sx={{ marginBottom: 2 }}
        >
          <option value="" disabled>Select a template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </TextField>
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <Typography variant="h6">Sub Items</Typography>
            {report.qrsubitems.map((subItem, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <TextField
                    label="Sub Item Name"
                    fullWidth
                    value={subItem.name}
                    onChange={(e) => handleChange({ target: { value: e.target.value, index, field: 'name' } })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Requirement"
                    fullWidth
                    value={subItem.requirement}
                    onChange={(e) => handleChange({ target: { value: e.target.value, index, field: 'requirement' } })}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <SaveButton onClick={handleSubmit}>保存</SaveButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default CreateQuality;
