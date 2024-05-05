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

export default function ProjectTable({ onRowClick }) {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [projectInfo, setprojectInfo] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [rows, setRows] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // 控制删除确认弹窗显示
  const [deleteId, setDeleteId] = useState(null); // 用于存储要删除的项目 ID

  //发送请求到后端获得数据
  useEffect(() => {
    axios
      .get("http://47.123.7.53:8000/show_project/")
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
  const handleRowClick = (pjname) => {
    onRowClick(`/PlanPage?projectName=${encodeURIComponent(pjname)}`);
  };

  //右击删除
  const handleRightClick = (e, pjname, pjid) => {
    e.preventDefault();
    // 显示删除确认弹窗
    setDeleteConfirmation(true);
    // 存储要删除的项目 ID
    setDeleteId(pjid);
  };
  const handleDeleteConfirmation = () => {
    // 发送删除请求
    axios
      .post(`http://47.123.7.53:8000/project/delete/`, { pjid: deleteId })
      .then((res) => {
        // 删除成功后更新前端项目列表
        setRows(rows.filter(row => row.pjid !== deleteId));
        // 隐藏删除确认弹窗
        setDeleteConfirmation(false);
      })
      .catch((error) => {
        console.error("Error deleting project", error);
        // 隐藏删除确认弹窗
        setDeleteConfirmation(false);
      });
  };

  const handleCancelDelete = () => {
    // 隐藏删除确认弹窗
    setDeleteConfirmation(false);
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
                  onClick={() => handleRowClick(row.pjname)}
                  onContextMenu={(e) => handleRightClick(e, row.pjname, row.pjid)}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={projectInfo}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       {/* 删除确认弹窗 */}
       {deleteConfirmation && (
        <div>
          <p>确定要删除吗？</p>
          <button onClick={handleDeleteConfirmation}>确定</button>
          <button onClick={handleCancelDelete}>取消</button>
        </div>
      )}
    </Paper>
  );
}
