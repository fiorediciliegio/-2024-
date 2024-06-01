
import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { pjcolumns } from "../constants/PROJECT_INFO.js";
import SearchBox from "./SearchBox.jsx";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ProjectTable({ onRowClick }) {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [projectInfo, setprojectInfo] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [rows, setRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // 用于存储要删除的项目 ID
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu

  //发送请求到后端获得数据
  useEffect(() => {
    axios
      .get("http://47.123.7.53:8000/project/list/")
      .then((res) => {
        const extractedData = res.data.map(item => ({
          pjname: item.pjname,
          pjnumber: item.pjnumber,
          pjtype:item.pjtype,
          pjmanager: item.pjmanager,
          pjid:item.pjid
        }));
        setRows(extractedData);
      })
      .catch((error) => {
        console.error("Error fetching data from server", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setprojectInfo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setprojectInfo(0); 
  };

  //点击跳转
  const handleRowClick = (pjname,pjid) => {
    onRowClick(`/PlanPage?projectName=${encodeURIComponent(pjname)}&projectId=${encodeURIComponent(pjid)}`);
  };

  // 打开菜单
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //关闭菜单
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // 处理删除事件
  const handleDelete = () => {
    console.log("delete:", deleteId); // 打印删除项目的 id 信息
    // 发送删除请求
    axios
      .post("http://47.123.7.53:8000/project/delete/", { pjid: deleteId })
      .then(() => {
        // 删除成功后更新前端项目列表
        setRows(rows.filter(row => row.pjid !== deleteId));
        // 关闭菜单
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error deleting project", error);
        // 关闭菜单
        handleMenuClose();
      });
  };

  // 过滤项目信息
  const filteredRows = rows.filter(row =>
    row.pjname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", padding: "20px" }}>
      {/* 搜索框 */}
      <SearchBox
        label="搜索项目名称..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
              {filteredRows
              .slice(projectInfo * rowsPerPage, projectInfo * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={row.code}
                  onClick={() => handleRowClick(row.pjname,row.pjid)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setDeleteId(row.pjid);
                    handleMenuOpen(e);
                  }}>
                    {pjcolumns.map((column) => {
                      // 排除 id 字段
                      if (column.id !== 'pjid') {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                  </TableRow>
                );
              })}
          </tbody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10,20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={projectInfo}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       {/* 删除确认弹窗 */}
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>删除项目</MenuItem>
      </Menu>
    </Paper>
  );
}
