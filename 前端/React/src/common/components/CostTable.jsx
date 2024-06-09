import React, { useState, useEffect } from 'react';
import { Paper, Table, TableCell, TableContainer,Grid,TableRow, Box, Button,
  CircularProgress, Alert,Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import SearchBox from '../components/SearchBox';
import CreateCost from '../popups/CreateCost';
import OpenButton from '../components/OpenButton.jsx';
import axios from 'axios';

const columns = [
  { id: 'name', label: '成本名称', minWidth: 170 },
  { id: 'date', label: '日期', minWidth: 100, align: 'right' },
];

export default function CostTable({projectId, projectName}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState(null);

//获得成本列表数据
  useEffect(() => {
    axios.get(`http://47.123.7.53:8000/cost/list/${projectId}/`)
      .then((res) => {
        setRows(res.data.costs);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data from server');
        setLoading(false);
      });
  }, [projectId]);

  //管理新建成本弹窗
  const [isCreateCostOpen, setIsCreatCostOpen] = useState(false);
  const openCreateCost = () => {
    setIsCreatCostOpen(true);
   };
   const closeCreateCost = () => {
    setIsCreatCostOpen(false);
  };

  //管理成本单信息弹窗
  const handleDialogOpen = (cost) => {
    setSelectedCost(cost);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCost(null);
  };

  //搜索
  const filteredRows = rows.filter(row => 
    row.costName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container marginTop={1}>
    <Paper sx={{ width: '90%', overflow: 'hidden', padding: '20px'}}>
        <Grid container direction="column" spacing={1}>
            {/*第一行*/}
            <Grid item container direction={"row"} spacing={1} >
                <Grid item xs={9} alignContent={"center"} >
                    <SearchBox
                        label="搜索成本名称..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
                <Grid item xs={3} alignContent={"center"}>
                    <OpenButton children={"新建成本单"} onClick={openCreateCost}/>
                    {isCreateCostOpen && <CreateCost onClose={closeCreateCost} projectId={projectId} projectName={projectName}/>}
                </Grid>
            </Grid>
            {/*第二行：列表*/}
            <Grid item container direction={"row"} spacing={1}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="cost table" >
                  <thead>
                    <TableRow >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </thead>
                <tbody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <Alert severity="error">{error}</Alert>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRows.map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleDialogOpen(row)}>
                          <TableCell>{row.costName}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                      </TableRow>
                    ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
            </Grid>
        </Grid>
        <Dialog 
          open={dialogOpen} 
          onClose={handleDialogClose} 
          PaperProps={{
          style: {
            width: '500px',
            maxWidth: 'none', 
          },
        }}>
        <DialogTitle>成本单详细信息</DialogTitle>
        <DialogContent>
          {selectedCost && (
            <Box>
              <p><strong>成本单:</strong> {selectedCost.costName}</p>
              <p><strong>日期:</strong> {selectedCost.date}</p>
              <p><strong>所属项目:</strong> {selectedCost.projectName}</p>
              <p><strong>费用类型:</strong> {selectedCost.expenseType}</p>
              <p><strong>财务人员:</strong> {selectedCost.accountant}</p>
              <p><strong>预算金额:</strong> {selectedCost.budgetAmount}</p>
              <p><strong>执行金额:</strong> {selectedCost.costAmount}</p>
              <p><strong>描述:</strong> {selectedCost.description}</p>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    </Grid>
  );
}
