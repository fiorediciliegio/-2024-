
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Grid,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  TextField,Dialog,DialogTitle,DialogContent,DialogActions,Button
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {lightBlue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const settings = [ "Account", "Logout"];

export default function NavBarWithSelect({ title, onSelectProject, defaultSelectedProject,user, onLogout  }) {

  /*向后端发送请求获得项目列表 */
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(defaultSelectedProject || null); // 设置默认选中的项目名称

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    axios
    .get("http://47.123.7.53:8000/project/list/")
    .then((res) => {
      const extractedData = res.data.map(item => ({
        pjname: item.pjname,
        pjid:item.pjid
      }));
      setProjectList(extractedData);
    })
    .catch((error) => {
      console.error("Error fetching data from server", error);
    });
  };
  
  const handleProjectChange = (event) => {
    const projectId = event.target.value; // 从事件对象中获取选择的项目值
    const projectName = projectList.find(item => item.pjid === projectId)?.pjname; // 根据项目ID找到对应的项目名称
    setSelectedProject(projectId); // 更新所选项目的值
    onSelectProject(projectName, projectId); // 通知父组件所选项目
  };

  /*用户账户的下拉菜单*/
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    //弹窗
    const [openDialog, setOpenDialog] = useState(false);
    const handleMenuItemClick = (setting) => {
      handleCloseUserMenu();
      if (setting === "Account") {
        setOpenDialog(true);
      } else if (setting === "Logout") {
        onLogout();
      }
    };
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container alignItems="center" direction="row">
            <Grid item xs={5}>
              {/* 左边logo */}
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {title}
              </Typography>
            </Grid>
            {/*选择项目*/}
            <Grid item conteriner xs={5}>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "30ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <TextField  
                  select
                  label="选择项目" 
                  variant="standard" 
                  value={selectedProject}
                  onChange={handleProjectChange}>
                    {projectList.map((item) => (
                      <MenuItem key={item.pjid} value={item.pjid}>
                        {item.pjname}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
            </Grid>
            <Grid item xs={1}>
              {/*Home键 */}
              <Box>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="close"
                   component={Link}
                  to="/"
                >
                  <HomeIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={1}>
              {/* 个人头像 */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: lightBlue[500] }}>
                  {user.username.charAt(0)}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      {/* 用户信息弹窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} 
        PaperProps={{
          sx: {
            width: '30%', // 控制宽度
          },
        }}>
        <DialogTitle>账户信息</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">用户名: {user.username}</Typography>
          <Typography variant="subtitle1">用户级别: {user.level}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}