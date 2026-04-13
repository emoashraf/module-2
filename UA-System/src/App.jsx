import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Training from "./components/page/Training";
import DashboardUser from "./components/Dashboard"; 
import Profile from "./components/page/Profile";
import Layout from "./components/Layout";
import Logout from "./components/page/Logout";
import Exam from "./components/page/Exam"; 
import AdminLayout from "./components/Adminlayout";
import Dashboard from "./components/adminpages/Dashboard";
import Activity from "./components/adminpages/Activity";
import Users from "./components/adminpages/Users";
import Reports from "./components/adminpages/Reports";
import Settings from "./components/adminpages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<DashboardUser />} /> 

        <Route path="dashboard" element={<DashboardUser />} />
        <Route path="training" element={<Training />} />
          <Route path="exam" element={<Exam />} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<Logout />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activity" element={<Activity />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;