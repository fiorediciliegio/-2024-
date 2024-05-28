import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Button, Container, Grid, Paper } from '@mui/material';

export default function SafetyIssueList () {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('/api/security-issues');
        setIssues(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleIssue = async (issueId) => {
    try {
      await axios.post(`/api/security-issues/${issueId}/handle`);
      setIssues((prevIssues) => prevIssues.filter((issue) => issue.id !== issueId));
    } catch (err) {
      console.error('Failed to handle issue:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h6" gutterBottom>
        安全问题列表
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          错误: {error.message}
        </Typography>
      ) : issues.length === 0 ? (
        <Typography variant="body1">没有发现安全问题。</Typography>
      ) : (
        <Grid container spacing={2}>
          {issues.map((issue) => (
            <Grid item xs={12} key={issue.id}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">{issue.title}</Typography>
                <Typography variant="body1">{issue.description}</Typography>
                <Button variant="contained" onClick={() => handleIssue(issue.id)}>
                  处理
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

