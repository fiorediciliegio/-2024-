import React, { useState, useEffect, Fragment }  from 'react';
import List from '@mui/material/List';
import {ListItem, ListItemText, Divider, ListItemAvatar,Avatar,Typography, Paper, Collapse, IconButton} from '@mui/material';
import { deepPurple, lightBlue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

export default function PersonList({projectId}) {
    const [personnel, setPersonnel] = useState([]);
    const [expanded, setExpanded] =useState(false);

    useEffect(() => {
        // 发送 GET 请求获取项目人员数据
        axios.get(`http://47.123.7.53:8000/person/project/list/${projectId}/`)
          .then(response => {
            console.log('Personnel data:', response.data);
            // 更新人员列表状态
            setPersonnel(response.data);
          })
          .catch(error => {
            console.error('Error fetching personnel data:', error);
          });
      }, [projectId]);

      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

      return (
        <Paper style={{ padding: "15px" }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {personnel.slice(0,3).map((person, index) => (
              <Fragment key={index}>
                <ListItem alignItems="flex-start">
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
                      <ListItem alignItems="flex-start">
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
        </Paper>
      );
    }