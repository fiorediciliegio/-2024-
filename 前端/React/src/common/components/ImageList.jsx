import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList({ projectId }) {
  const [itemData, setItemData] = useState([]);


  useEffect(() => {
    const fetchImageMetadata = async () => {
      try {
        const response = await axios.get(`http://47.123.7.53:8000/safety/report/image/${projectId}/metadata/`);
        const metadata = response.data.images;
        setItemData(metadata);
        // 请求每个图像文件
        for (const item of metadata) {
          const imgResponse = await axios.get(`http://47.123.7.53:8000${item.img_url}`, {
            responseType: 'blob'
          });
          const imgUrl = URL.createObjectURL(imgResponse.data);
          setItemData(prevState => prevState.map(data => data.img_url === item.img_url ? { ...data, img: imgUrl } : data));
        }
      } catch (error) {
        console.error('Error fetching the images:', error);
      }
    };
    fetchImageMetadata();
  }, [projectId]);


  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {itemData.map((item, index) => (
        <ImageListItem key={index}>
          {item.img ? (
            <img
            src={item.img}
            alt={item.title || 'Image'}
            loading="lazy"
            onError={(e) => { e.target.onerror = null; e.target.src = "fallback_image_url"; }} 
            />
          ) : (
            <div style={{ width: 248, height: 248, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
              <span>Image Not Available</span>
            </div>
          )}
          <ImageListItemBar
            title={item.title || 'No Title'}
            subtitle={item.author || 'Unknown Author'}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title || 'No Title'}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
