import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,Grid,
     TableRow,  Box, CircularProgress, Alert } from '@mui/material';
import SearchBox from '../components/SearchBox';
import CreateCost from '../popups/CreateCost';
import OpenButton from '../components/OpenButton.jsx';
import axios from 'axios';

const columns = [
  { id: 'name', label: '成本名称', minWidth: 170 },
  { id: 'amount', label: '金额', minWidth: 100, align: 'right' },
];

export default function CostTable({projectId, projectName}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

//获得成本列表数据
  useEffect(() => {
    axios.get(`http://47.123.7.53:8000/cost/list/${projectId}`)
      .then((res) => {
        setRows(res.data);
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
  //


  //搜索
  const filteredRows = rows.filter(row => 
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden', padding: '20px' }}>
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
          <TableHead>
            <TableRow>
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
          </TableHead>
          <TableBody>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
            </Grid>
        </Grid>
    </Paper>
  );
}
