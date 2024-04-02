import React from "react";
import "./styles.css";

//搜索栏
function SearchBar() {
  return (
    <div className="SearchInput">
      <div className="Label">Search...</div>
    </div>
  );
}
//新建项目按钮
function CreateButton() {
  return (
    <div className="Button">
      <div style={{ color: "white" }}>新建项目</div>
    </div>
  );
}
//侧边模块按钮
function ModuleButton({ value }) {
  return (
    <div className="MenuItem">
      <div style={{ color: "black" }}>{value}</div>
    </div>
  );
}
//侧边栏
function SideBar() {
  return (
    <div>
      <div style={{ color: "black" }}>Managemant</div>
      <ModuleButton value="项目管理" />
      <div style={{ color: "black" }}>Archive</div>
    </div>
  );
}
//全界面
function WholeTable() {
  return (
    <div className="grid-container">
      <SideBar />
      <SearchBar />
      <CreateButton />
    </div>
  );
}

export default function App() {
  return <WholeTable />;
}
