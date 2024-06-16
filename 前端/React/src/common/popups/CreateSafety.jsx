import React, { useState } from 'react';
import { Typography, Grid, TextField, RadioGroup, FormControlLabel, Radio, Button, IconButton } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import TimePicker from '../components/TimePicker';
import InputBox from '../components/InputBox';
import InputBoxML from '../components/InputBoxML.jsx';
import CommonCreate from "./CommonCreate";
import useFormSubmit from '../hooks/useFormSubmit.js';

export default function CreateSafety({ onClose, templates, projectId }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [report, setReport] = useState({
    srname: '',
    srpart: '',
    srperson: '',
    srins_date: '',
    srnumber: '',
    srsubitems: [{ name: '', requirement: '', result: '' }],
    srfeedback: '',
    srevaluation: '',
  });
  const [photos, setPhotos] = useState([]);

  //选择模板
  const handleTemplateChange = (e) => {
    const templateId = parseInt(e.target.value);
    const template = templates.find(t => t.id === templateId);

    if (template) {
      setSelectedTemplate(template);
      setReport({
        ...report,
        srname: template.name,
        srsubitems: template.items.map(item => ({ name: item.name, requirement: item.value, result: '' }))
      });
    } else {
      console.error(`Template with ID ${templateId} not found`);
      setSelectedTemplate(null);
      setReport({ ...report, srsubitems: [] });
    }
  };

  //输入值
  const handleChange = (value, fieldName, index) => {
    if (fieldName === 'srsubitems') {
      setReport(prevReport => ({
        ...prevReport,
        srsubitems: prevReport.srsubitems.map((item, idx) => {
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

  // 处理照片上传
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPhotos([...photos, ...newPhotos]);
  };

  // 删除照片
  const handleDeletePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };
  
  const { handleSubmit, loading, error } = useFormSubmit();
   // 提交表单
   const submitForm = async () => {
    const formData = new FormData();
    formData.append('report', JSON.stringify(report));
    photos.forEach((photo, index) => {
      formData.append(`images`, photo.file);
    });
    try {
      await handleSubmit(formData, `http://47.123.7.53:8000/safety/report/add/${projectId}/`, onClose);
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  // 构建 fields 数组
  const fields = [
    {component: (
        <TextField
          select
          label="选择模板"
          sx={{width:"90%"}}
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
      width: 12
    },
    {component: (
        <InputBox label="工程名称" value={report.srname} onChange={(e) => handleChange(e, 'srname')} />),
      width: 6},
    {component: (
        <InputBox label="检查部位及编号" value={report.srpart} onChange={(e) => handleChange(e, 'srpart')} />
      ),
      width: 6
    },
    {component: (
        <InputBox label="安全员" value={report.srperson} onChange={(e) => handleChange(e, 'srperson')} />
      ),
      width: 6
    },
    {component: (
        <TimePicker label="检查时间" value={report.srins_date} onChange={(e) => handleChange(e, 'srins_date')} />
      ),
      width: 6
    },
    { component: (
        <InputBox label="报告编号" value={report.srnumber} onChange={(e) => handleChange(e, 'srnumber')} />
      ),
      width: 6
    },
    {component: (
      <div>
        <Button
          variant="contained"
          component="label"
          sx={{ margin: 1 }}
          startIcon={<PhotoCamera />}
        >
          上传现场照片
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />
        </Button>
        {photos.length > 0 && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {photos.map((photo, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={photo.preview}
                    alt={photo.file.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Typography variant="body2" noWrap>{photo.file.name}</Typography>
                  <IconButton
                    onClick={() => handleDeletePhoto(index)}
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
        </div>
      ),
      width: 6
    },
    {
      component: (
        <Grid item container direction="row">
              <Grid item xs={1}></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>检验项目*</Typography></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>检验标准*</Typography></Grid>
              <Grid item xs={3}><Typography sx={{ textAlign: "center" }}>检验结果</Typography></Grid>
            </Grid>
      ),
      width: 12
    },
    ...report.srsubitems.map((subItem, index) => ({
      component: (
        <Grid container spacing={2} key={index} alignItems="center" marginBottom={1}>
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
              onChange={(e) => handleChange({ target: { value: e.target.value }, field: 'result' }, 'srsubitems', index)}
            />
          </Grid>
        </Grid>
      ),
      width: 12
    })),
    {component: (
        <InputBoxML label="安全员意见" value={report.srfeedback} onChange={(e) => handleChange(e, 'srfeedback')} />
      ),
      width: 6
    },
    {component: (
        <>
          <Typography>总体情况</Typography>
          <RadioGroup
            row
            aria-label="overallSafety"
            name="overallSafety"
            value={report.srevaluation}
            onChange={(e) => handleChange(e, 'srevaluation')}
          >
            <FormControlLabel value="合格" control={<Radio />} label="合格" />
            <FormControlLabel value="一般安全问题" control={<Radio />} label="一般安全问题" />
            <FormControlLabel value="重大安全问题" control={<Radio />} label="重大安全问题" />
          </RadioGroup>
        </>
      ),
      width: 6
    },
  ];

  return (
    <CommonCreate
    title="新建安全报告"
    fields={fields}
    onClose={onClose}
    onSubmit={submitForm}
    >
      {loading && <p>正在提交...</p>}
      {error && <p style={{ color: 'red' }}>提交失败: {error.message}</p>}
    </CommonCreate>
);
}
