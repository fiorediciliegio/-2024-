import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { percolumns } from "../constants/PERSON_INFO.js";
import SearchBox from "./SearchBox.jsx";

export default function PersonTable() {
  const [searchQuery, setSearchQuery] = useState(""); // 用于保存搜索词
  const [personInfo, setpersonInfo] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [rows, setRows] = useState([]);

  //发送请求到后端获得数据
  useEffect(() => {
    axios
      .get(`http://47.123.7.53:8000/show_person/`)
      .then((res) => {
        const extractedData = res.data.map(item => ({
          pername: item.pername,
          pernumber: item.pernumber,
          permail:item.permail,
          perrole: item.perrole
        }));
        setRows(extractedData);
      })
      .catch((error) => {
        console.error("Error fetching data from server", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setpersonInfo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setpersonInfo(0); 
  };

  // 过滤人员信息
  const filteredRows = rows.filter(row =>
    row.pername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", padding: "20px" }}>
      {/* 搜索框 */}
      <SearchBox
        label="搜索人员名称..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="project table">
          <thead>
            <TableRow>
              {percolumns.map((column) => (
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
              {filteredRows
              .slice(personInfo * rowsPerPage, personInfo * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={row.code}>
                    {percolumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </tbody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={personInfo}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
