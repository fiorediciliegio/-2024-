import React from 'react';
import PropTypes from 'prop-types';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(issue, result, checkdate, solution) {
  return {
    issue,
    result,
    checkdate,
    solution,
    more: [
      {
        person: 'lola',
        description: 'des1',
        issueID: 1,
      }
    ],
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
          {row.issue}
        </TableCell>
        <TableCell align="right">{row.result}</TableCell>
        <TableCell align="right">{row.checkdate}</TableCell>
        <TableCell align="right">{row.solution}</TableCell>
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
                    <TableCell>检查人员</TableCell>
                    <TableCell>描述</TableCell>
                    <TableCell align="right">报告编号</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.more.map((moreRow) => (
                    <TableRow key={moreRow.issueID}>
                      <TableCell component="th" scope="row">
                        {moreRow.person}
                      </TableCell>
                      <TableCell>{moreRow.description}</TableCell>
                      <TableCell align="right">{moreRow.issueID}</TableCell>
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
    result: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    solution: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('项目1', '合格', "2024-02-08", "无"),
  createData('项目2','一般质量问题', "2024-05-13", "待处理"),
  createData('项目3','合格', "2024-03-06", "无"),
];

export default function ReportList() {
  return (
    <Box  style={{
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
                <TableCell>检查项目</TableCell>
                <TableCell align="right">检查情况</TableCell>
                <TableCell align="right">日期</TableCell>
                <TableCell align="right">处理</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
