import React from "react";
import "./Reports.css";

function Reports() {
  return (
    <>
      <h2>Reports & Analytics</h2>

      <div className="report-cards">
        <div className="report-card">
          <h3>120</h3>
          <p>Total Logins</p>
        </div>

        <div className="report-card">
          <h3>85%</h3>
          <p>User Activity Rate</p>
        </div>

        <div className="report-card">
          <h3>5</h3>
          <p>Security Alerts</p>
        </div>
      </div>

      <div className="chart-box">
        <h3>Login Activity (Weekly)</h3>

        <div className="bar-chart">
          <div style={{ height: "60%" }}></div>
          <div style={{ height: "80%" }}></div>
          <div style={{ height: "40%" }}></div>
          <div style={{ height: "90%" }}></div>
          <div style={{ height: "70%" }}></div>
        </div>
      </div>
    </>
  );
}

export default Reports;