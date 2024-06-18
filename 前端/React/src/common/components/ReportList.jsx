import React, { useEffect, useState,forwardRef, useImperativeHandle  } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(qrname, qrpart, qrevaluation, qrins_date, more) {
  return {
    qrname: qrname,
    qrpart: qrpart,
    qrevaluation: qrevaluation,
    qrins_date: qrins_date,
    more,
  };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.qrname}
        </TableCell>
        <TableCell align="right">{row.qrpart}</TableCell>
        <TableCell align="right">{row.qrevaluation}</TableCell>
        <TableCell align="right">{row.qrins_date}</TableCell>
        <TableCell align="right">{row.qrfeedback}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                MORE
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>质检员</TableCell>
                    <TableCell>质检员意见</TableCell>
                    <TableCell>施工时间</TableCell>
                    <TableCell align="right">报告编号</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.more.map((moreRow,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {moreRow.qrperson}
                      </TableCell>
                      <TableCell>{moreRow.qrfeedback}</TableCell>
                      <TableCell>{moreRow.qrcons_date}</TableCell>
                      <TableCell align="right">{moreRow.qrnumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    qrname: PropTypes.string.isRequired,
    qrpart: PropTypes.string.isRequired,
    qrevaluation: PropTypes.string.isRequired,
    qrins_date: PropTypes.string.isRequired,
    more: PropTypes.arrayOf(
      PropTypes.shape({
        qrperson: PropTypes.string.isRequired,
        qrfeedback: PropTypes.string,
        qrcons_date: PropTypes.string.isRequired,
        qrnumber: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const ReportList = forwardRef((props, ref) => {
  const [rows, setRows] = useState([]);

  const fetchData =()=>{
    axios.get(`http://47.123.7.53:8000/quality/report/list/${props.projectId}/`) 
      .then(response => {
        const fetchedData = response.data.map(item => 
          createData(
            item.qrname,
            item.qrpart,
            item.qrevaluation,
            item.qrins_date,
            [{
              qrperson: item.qrperson,
              qrfeedback: item.qrfeedback,
              qrcons_date: item.qrcons_date,
              qrnumber: item.qrnumber,
            }]
          )
        );
        setRows(fetchedData);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
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

  return (
    <Box style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "95%",
      height: "100%",
    }}>
      <TableContainer component={Paper} style={{ marginTop: '16px' }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>检验工程</TableCell>
              <TableCell align="right">部位及编号</TableCell>
              <TableCell align="right">检验情况</TableCell>
              <TableCell align="right">检验日期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.qrname} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});
export default ReportList;
