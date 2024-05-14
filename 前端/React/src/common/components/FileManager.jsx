import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { CloudUpload, CloudDownload, Visibility, Close } from '@mui/icons-material';
import axios from 'axios';

export default function FileManager({projectId}) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  // 上传文件
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`http://47.123.7.53:8000/document/upload/${projectId}`, formData)
      .then((response) => {
        setFiles([...files, file.name]);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  // 下载文件
  const handleDownload = (fileName) => {
    axios.get(`http://47.123.7.53:8000/document/download/${fileName}`, {
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
  };

  // 预览文件
  const handlePreview = (fileName) => {
    setSelectedFile(fileName);
    setOpenPreview(true);
  };

  // 关闭预览对话框
  const handleClosePreview = () => {
    setOpenPreview(false);
    setSelectedFile(null);
  };

  return (
    <div>
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
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="preview" onClick={() => handlePreview(file)}>
                <Visibility />
              </IconButton>
              <IconButton edge="end" aria-label="download" onClick={() => handleDownload(file)}>
                <CloudDownload />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogTitle>预览文件</DialogTitle>
        <DialogContent>
          {/* 根据文件类型显示不同的预览组件 */}
          {selectedFile && (
            <embed src={`http://47.123.7.53:8000/document/${selectedFile}`} style={{ width: '100%', height: '500px' }} />
          )}
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
