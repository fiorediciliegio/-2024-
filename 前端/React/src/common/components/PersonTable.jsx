import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { percolumns } from "../constants/PERSON_INFO.js";
import SearchBox from "./SearchBox.jsx";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../hooks/AuthContext';

const PersonTable = forwardRef((props,ref) => {
  const [searchQuery, setSearchQuery] = useState(""); // 用于保存搜索词
  const [personInfo, setpersonInfo] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [rows, setRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // 用于存储要删除的人员 ID
  const [anchorEl, setAnchorEl] = useState(null); // 弹窗
  // 根据用户级别决定按钮的可用性
  const { user } = useAuth();
  const isManager = user && user.level === '管理者'; 

  //发送请求到后端获得数据
  useEffect(() => {
    fetchPersonData();
  }, []);

  const fetchPersonData = () => {
    axios
      .get(`http://47.123.7.53:8000/person/list/`)
      .then((res) => {
        const extractedData = res.data.map(item => ({
          pername: item.pername,
          pernumber: item.pernumber,
          permail:item.permail,
          perrole: item.perrole,
          perid:item.perid
        }));
        setRows(extractedData);
      })
      .catch((error) => {
        console.error("Error fetching data from server", error);
      });
  };
  // 处理分页变化
  const handleChangePage = (event, newPage) => {
    setpersonInfo(newPage);
  };
 // 处理每页显示条数变化
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setpersonInfo(0); 
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
      .post("http://47.123.7.53:8000/person/delete/", { perid: deleteId })
      .then(() => {
        // 删除成功后更新前端项目列表
        fetchPersonData();
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error deleting person", error);
        // 关闭菜单
        handleMenuClose();
      });
  };

  // 过滤人员信息
  const filteredRows = rows.filter(row =>
    row.pername.toLowerCase().includes(searchQuery.toLowerCase())
  );

   // 使用 useImperativeHandle 向父组件暴露刷新数据的方法
   useImperativeHandle(ref, () => ({
    refreshData() {
      fetchPersonData();
    }
  }));

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
                  key={row.code}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setDeleteId(row.perid);
                    handleMenuOpen(e);
                  }}>
                    {percolumns.map((column) => {
                      //排除 id 字段
                      if (column.id !== 'perid') {
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
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={personInfo}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* 删除确认弹窗 */}
      {isManager && 
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>删除人员</MenuItem>
      </Menu>}
    </Paper>
  );
});
export default PersonTable;