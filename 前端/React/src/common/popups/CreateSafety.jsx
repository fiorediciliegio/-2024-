import React, { useState} from 'react';
import Modal from "react-modal";
import axios from 'axios';
import { Typography, Grid,  TextField, RadioGroup, FormControlLabel, Radio, Button,IconButton  } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import TimePicker from '../components/TimePicker';
import InputBox from '../components/InputBox';
import InputBoxML from '../components/InputBoxML.jsx';
import TopBar from "../components/TopBar.jsx";
import SaveButton from '../components/SaveButton';

Modal.setAppElement("#root");

export default function CreateSafety  ({ onClose, templates, projectId })  {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [report, setReport] = useState({
    srname: '',
    srpart: '',
    srperson: '',
    srins_date: '',
    srnumber: '',
    srsubitems: [{name:'', requirement:'', result:''}],
    srfeedback:'',
    srevaluation:'',
  });
  const [photos, setPhotos] = useState([]); // 修改为数组状态

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
  const handleChange = (value, fieldName,index) => {
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

  //保存到后端
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('report', JSON.stringify(report));
    photos.forEach((photo, index) => {
      formData.append(`images`, photo.file);
    });
    try {
      // 打印发送的内容
      console.log("Sending report:", report);
      await axios.post(`http://47.123.7.53:8000/safety/report/add/${projectId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        <TopBar title="新建安全报告" close={onClose}/>
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
              <InputBox label="工程名称" value={report.srname} onChange={(e) => handleChange(e, 'srname')} />
            </Grid>
            <Grid item xs={6}>
              <InputBox label="检查部位及编号" value={report.srpart} onChange={(e) => handleChange(e, 'srpart')} />
            </Grid>
            <Grid item xs={6}>
              <InputBox label="安全员" value={report.srperson} onChange={(e) => handleChange(e, 'srperson')} />
            </Grid>
            <Grid item xs={6}>
              <TimePicker label="检查时间" value={report.srins_date} onChange={(e) => handleChange(e, 'srins_date')} />
            </Grid>
            <Grid item xs={6}>
              <InputBox label="报告编号" value={report.srnumber} onChange={(e) => handleChange(e, 'srnumber')} />
            </Grid>
            <Grid item xs={6}>
              {/*上传安全检查照片*/}
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
            </Grid>
          </Grid>
          {/*检验子项目*/}
          <Grid item container >
            <Grid item container direction="row">
              <Grid item xs={1}></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>检验项目*</Typography></Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: "center" }}>检验标准*</Typography></Grid>
              <Grid item xs={3}><Typography sx={{ textAlign: "center" }}>检验结果</Typography></Grid>
            </Grid>
            {report.srsubitems.map((subItem, index) => (
              <Grid item container spacing={2} key={index} alignItems="center" marginBottom={1}>
                <Grid item xs={1} alignContent="center" >
                  <Typography sx={{ textAlign: "center" }}>{index+1}</Typography>
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
            ))}
          </Grid>
          {/*其他信息*/}
          <Grid item container justifyContent="flex-start" alignContent="flex-start">
            <Grid item container xs={6}>
              <InputBoxML label="安全员意见" value={report.srfeedback} onChange={(e) => handleChange(e, 'srfeedback')} />
            </Grid>
            <Grid item container xs={6} direction={"column"}>
              <Grid item><Typography >总体情况</Typography></Grid>
              <Grid item container >
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
              </Grid>
              <Grid item container justifyContent="flex-end"> <SaveButton onClick={handleSubmit}>提交报告</SaveButton></Grid>
            </Grid>
          </Grid> 
        </Grid>
      </div>
    </Modal>
  );
};


