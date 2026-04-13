import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";   

function AdminLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">

        <div className="content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;