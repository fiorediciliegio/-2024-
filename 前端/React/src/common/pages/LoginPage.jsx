import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 实现登录逻辑，这里仅打印用户名和密码
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <LockOutlinedIcon style={{ fontSize: "50px", marginBottom: "20px" }} />
          <Typography variant="h5" gutterBottom>
            ManageYourProject 登录
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="用户名"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密码"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleLogin}
          >
            登录
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
