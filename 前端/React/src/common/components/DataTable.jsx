import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { pjcolumns } from "../constants/PROJECT_INFO.js";

export default function DataTable() {

  const [projectInfo, setprojectInfo] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setprojectInfo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setprojectInfo(0); 
  };

  useEffect(() => {
    axios
      .get("API_URL")
      .then((res) => {
        const extractedData = res.data.map(item => ({
          pjname: item.pjname,
          pjnumber: item.pjnumber,
          pjtype:item.pjtype,
          pjmanager: item.pjmanager
        }));
        setRows(extractedData);
      })
      .catch((error) => {
        console.error("Error fetching data from server", error);
      });
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="project table">
          <thead>
            <TableRow>
              {pjcolumns.map((column) => (
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
            {rows
              .slice(projectInfo * rowsPerPage, projectInfo * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {pjcolumns.map((column) => {
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
        page={projectInfo}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
