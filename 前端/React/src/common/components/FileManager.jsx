import React, { useState, useEffect} from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, 
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, 
  Paper, Grid, Typography, Checkbox,  Snackbar, TextField, CircularProgress} from '@mui/material';
import { CloudUpload, CloudDownload, Visibility, Close, Delete } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

export default function FileManager({ projectId }) {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // 在 FileManager 组件中添加一个新的状态用于跟踪上传进度
  const [uploadProgress, setUploadProgress] = useState(0);
  // 根据用户级别决定按钮的可用性
  const { user } = useAuth();
  const isManager = user && user.level === '管理者'; 

  // 获取已上传的文件列表
  useEffect(() => {
    axios.get(`http://47.123.7.53:8000/file/project/list/${projectId}/`)
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

    axios.post(`http://47.123.7.53:8000/file/upload/${projectId}/`, formData,{
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      }
    })
      .then(() => {
        // 上传完成后重置上传进度
        setUploadProgress(0);
        // 刷新文件列表
        axios.get(`http://47.123.7.53:8000/file/project/list/${projectId}/`)
          .then(response => {
            setFiles(response.data.files);
            setSnackbarMessage('上传成功');
            setOpenSnackbar(true);
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
    selectedFiles.forEach((fileId) => {
      const file = files.find(file => file.file_id === fileId);
      const fileName = file ? `${file.file_name}.${file.file_format}` : fileId;
      axios.get(`http://47.123.7.53:8000/file/download/${fileId}/`, {
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('error downloading file:', error);
        });
    });
  };
  // 删除文件
  const handleDelete = () => {
    selectedFiles.forEach((fileId) => {
      axios.post("http://47.123.7.53:8000/file/delete/",{file_id:fileId})
        .then(() => {
          // 刷新文件列表
          axios.get(`http://47.123.7.53:8000/file/project/list/${projectId}/`)
            .then(response => {
              setFiles(response.data.files);
              setSelectedFiles([]); // 清空已选文件
            })
            .catch(error => {
              console.error('Error fetching file list:', error);
            });
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
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
  const handleCheckboxChange = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((file) => file !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };
   // 关闭Snackbar
   const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  //搜索
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredFiles = files.filter(file => 
    file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Grid container spacing={2} marginTop={1}>
          <input
            type="file"
            accept=".pdf,.txt,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            id="file-upload"
            onChange={handleUpload}
          />
        <Grid item >
          <Paper elevation={3} style={{ maxHeight:600, width:800, overflow: 'auto' }} >
            <List>
              <ListItem>
                <TextField
                  label="搜索文件"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ width: 350, margin:1 }}
                />
                {uploadProgress > 0 && <CircularProgress variant="determinate" value={uploadProgress} />}
                {/*文件操作button组 */}
                <ListItemSecondaryAction>
                  <Grid container spacing={1} alignItems="center">
                    {/*上传*/}
                    <Grid item>
                      <IconButton aria-label="upload" onClick={() => document.getElementById('file-upload').click()}>
                        <CloudUpload />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">上传</Typography>
                    </Grid>
                    {/*预览*/}
                    <Grid item>
                      <IconButton aria-label="preview" onClick={handlePreview} disabled={selectedFiles.length === 0}>
                        <Visibility />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">预览</Typography>
                    </Grid>
                    {/*下载*/}
                    <Grid item>
                      <IconButton aria-label="download" onClick={handleDownload} disabled={selectedFiles.length === 0}>
                        <CloudDownload />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">下载</Typography>
                    </Grid>
                    {/*删除*/}
                    {isManager && 
                    <Grid item>
                      <IconButton aria-label="delete" onClick={handleDelete} disabled={selectedFiles.length === 0}>
                        <Delete />
                      </IconButton>
                    </Grid>}
                    {isManager &&
                    <Grid item>
                      <Typography variant="body2">删除</Typography>
                    </Grid>}
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              {filteredFiles.map((file) => (
                <ListItem key={file.file_id} divider>
                  <Checkbox
                    checked={selectedFiles.includes(file.file_id)}
                    onChange={() => handleCheckboxChange(file.file_id)}
                  />
                  <ListItemText primary={`${file.file_name} ${file.file_format}`} secondary={file.upload_time} />
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
          {selectedFiles.map((fileId) => {
            const file = files.find(f => f.file_id === fileId);
            const previewUrl = file ? `http://47.123.7.53:8000/file/preview/${fileId}` : null;

            if (!file || !previewUrl) {
              console.error(`无法预览ID为 ${fileId} 的文件`);
              return null;
            }
            return (
              <iframe
                key={fileId}
                title="文件预览"
                src={previewUrl}
                style={{ width: '100%', height: '500px', marginBottom: 10 }}
                charSet="UTF-8"
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} startIcon={<Close />}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}