import React, { useState, useEffect, Fragment,forwardRef, useImperativeHandle }  from 'react';
import List from '@mui/material/List';
import {ListItem, ListItemText, Divider, ListItemAvatar,
  Avatar,Typography, Paper, Collapse, IconButton, Menu, MenuItem} from '@mui/material';
import { deepPurple, lightBlue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const PersonList = forwardRef((props,ref) => {
    const [personnel, setPersonnel] = useState([]);
    const [expanded, setExpanded] =useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const fetchData =()=>{
        // 发送 GET 请求获取项目人员数据
        axios.get(`http://47.123.7.53:8000/person/project/list/${props.projectId}/`)
          .then(response => {
            console.log('Personnel data:', response.data);
            // 更新人员列表状态
            setPersonnel(response.data);
          })
          .catch(error => {
            console.error('Error fetching personnel data:', error);
          });
      };

  useEffect(() => {
    fetchData();
  }, []);
  
  // 使用 useImperativeHandle 向父组件暴露刷新数据的方法
   useImperativeHandle(ref, () => ({
    refreshData() {
      fetchData();
    }
  }));

      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

      const handleContextMenu = (event, person) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedPerson(person);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
        setSelectedPerson(null);
      };
      //从项目移除人员
      const handleRemovePerson = () => {
        if (selectedPerson) {
          axios.post(`http://47.123.7.53:8000/person/remove/${props.projectId}/`, {
            person_id: selectedPerson.perid,
          })
            .then(response => {
              // 从人员列表中移除被删除的人员
              setPersonnel(personnel.filter(person => person.perid !== selectedPerson.perid));
              handleClose();
              if(props.onUpdate){
                props.onUpdate();
              };
            })
            .catch(error => {
              console.error('Error removing person:', error);
              handleClose();
            });
        }
      };

      return (
        <Paper style={{ padding: "15px" }}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {personnel.slice(0,3).map((person, index) => (
              <Fragment key={index}>
                <ListItem alignItems="flex-start" onContextMenu={(event) => handleContextMenu(event, person)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{person.pername.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={person.pername}
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {person.perrole}
                        </Typography>
                        {" — " + person.permail}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Fragment>
            ))}
            {personnel.length > 3 && (
              <Fragment>
                <ListItem>
                  <IconButton
                    aria-expanded={expanded}
                    aria-label="show more"
                    onClick={handleExpandClick}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </ListItem>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  {personnel.slice(3).map((person, index) => (
                    <Fragment key={index}>
                      <ListItem alignItems="flex-start" onContextMenu={(event) => handleContextMenu(event, person)}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: lightBlue[500] }}>{person.pername.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={person.pername}
                          secondary={
                            <Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {person.perrole}
                              </Typography>
                              {" — " + person.permail}
                            </Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  ))}
                </Collapse>
              </Fragment>
            )}
          </List>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleRemovePerson}>移除人员</MenuItem>
          </Menu>
        </Paper>
      );
    });
    export default PersonList;