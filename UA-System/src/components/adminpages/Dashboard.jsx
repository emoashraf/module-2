import React, { useEffect, useState } from "react";
import "./Dashboardadmin.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    alerts: 0,
    logout: 0,
  });

  useEffect(() => {
    setStats({
      total: 120,
      active: 85,
      alerts: 5,
      logout: 35,
    });
  }, []);

  return (
    <div className="dash-wrapper">
      <h2 className="dash-title">Dashboard Overview</h2>

      <div className="dash-cards">
        <div className="dash-card dash-total">
          <h3>{stats.total}</h3>
          <p>Total Users</p>
        </div>

        <div className="dash-card dash-active">
          <h3>{stats.active}</h3>
          <p>Active Users</p>
        </div>

        <div className="dash-card dash-alerts">
          <h3>{stats.alerts}</h3>
          <p>Alerts</p>
        </div>

        <div className="dash-card dash-logout">
          <h3>{stats.logout}</h3>
          <p>Logged Out</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;