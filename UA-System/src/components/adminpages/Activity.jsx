
import React from "react";
import "./Activity.css";

function Activity() {
  const data = [
    {
      user: "Sanjai",
      typing: 72,
      mouse: "Normal",
      status: "Safe",
      login: "10:30 AM",
      logout: "11:10 AM",
    },
    {
      user: "Rahul",
      typing: 45,
      mouse: "Slow",
      status: "Warning",
      login: "09:00 AM",
      logout: "09:20 AM",
    },
    {
      user: "Kumar",
      typing: 90,
      mouse: "Fast",
      status: "Safe",
      login: "08:30 AM",
      logout: "10:00 AM",
    },
    {
      user: "Arun",
      typing: 30,
      mouse: "Abnormal",
      status: "Alert",
      login: "11:00 AM",
      logout: "11:05 AM",
    },
  ];

  return (
    <>
      <h2>Activity Monitoring</h2>

      <div className="table-container">
        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Typing Speed (WPM)</th>
              <th>Mouse Behavior</th>
              <th>Status</th>
              <th>Login</th>
              <th>Logout</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.user}</td>
                <td>{item.typing}</td>
                <td>{item.mouse}</td>

                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>

                <td>{item.login}</td>
                <td>{item.logout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Activity;