import React, { useState, useEffect} from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  Paper, Grid, Typography, Checkbox,Divider } from '@mui/material';
import { CloudUpload, CloudDownload, Visibility, Close } from '@mui/icons-material';
import axios from 'axios';

export default function FileManager({ projectId }) {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);

  // 获取已上传的文件列表
  useEffect(() => {
    axios.get(`http://47.123.7.53:8000/document/list/${projectId}/`)
      .then(response => {
        setFiles(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching file list:', error);
      });
  }, [projectId]);

  // 上传文件
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`http://47.123.7.53:8000/document/upload/${projectId}/`, formData)
      .then(() => {
        // 刷新文件列表
        axios.get(`http://47.123.7.53:8000/document/list/${projectId}/`)
          .then(response => {
            setFiles(response.data.files);
          })
          .catch(error => {
            console.error('Error fetching file list:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  // 下载文件
  const handleDownload = () => {
    selectedFiles.forEach((fileName) => {
      axios.get(`http://47.123.7.53:8000/document/download/${fileName}/`, {
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
    });
  };

  // 预览文件
  const handlePreview = () => {
    setOpenPreview(true);
  };

  // 关闭预览对话框
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  // 处理复选框选择
  const handleCheckboxChange = (fileName) => {
    if (selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter((file) => file !== fileName));
    } else {
      setSelectedFiles([...selectedFiles, fileName]);
    }
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            id="file-upload"
            onChange={handleUpload}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" startIcon={<CloudUpload />}>
              上传文件
            </Button>
          </label>
        </Grid>
        <Grid item xs>
          <Typography variant="h6">文件列表</Typography>
          <Paper elevation={3} style={{ maxHeight: 400,width:600, overflow: 'auto' }}>
            <List>
              <ListItem>
                <Checkbox
                  indeterminate={selectedFiles.length > 0 && selectedFiles.length < files.length}
                  checked={selectedFiles.length === files.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedFiles(files);
                    } else {
                      setSelectedFiles([]);
                    }
                  }}
                />
                <ListItemText primary="全选" />
                {/*文件操作button组 */}
                <ListItemSecondaryAction>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <IconButton aria-label="upload" onClick={() => document.getElementById('file-upload').click()}>
                        <CloudUpload />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">上传</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="preview" onClick={handlePreview} disabled={selectedFiles.length === 0}>
                        <Visibility />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">预览</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="download" onClick={handleDownload} disabled={selectedFiles.length === 0}>
                        <CloudDownload />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">下载</Typography>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              {files.map((file, index) => (
                <ListItem key={index} divider>
                  <Checkbox
                    checked={selectedFiles.includes(file)}
                    onChange={() => handleCheckboxChange(file)}
                  />
                  <ListItemText primary={file} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle>预览文件</DialogTitle>
        <DialogContent>
          {/* 根据文件类型显示不同的预览组件 */}
          {selectedFiles.map((fileName) => (
            <embed key={fileName} src={`http://47.123.7.53:8000/document/${fileName}`} style={{ width: '100%', height: '500px', marginBottom: 10 }} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} startIcon={<Close />}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
