import React, { useState, useEffect } from "react";
import Axios from "axios";
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
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavBarWithSelect({ title, onSelectProject  }) {

  /*向后端发送请求获得项目列表 */
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get("your-backend-url/projects");/*url*/
      setProjects(response.data.projects);/*这里projects是后端发送json对象的名称*/
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleProjectChange = (event) => {
    const project = event.target.value;
    setSelectedProject(project);
    onSelectProject(project); // 通知父组件所选项目
  };
  /*用户账户的下拉菜单*/
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
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
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.name}>
                        {project.name}{/* 这里id 和 name对应json里的命名*/}
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
                  onClick={() => {
                    window.open("/", "_self");
                  }}
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
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.imgur.com/yXOvdOSs.jpg"
                    />
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
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
