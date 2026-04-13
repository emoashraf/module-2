// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Sidebar.css";

// function Sidebar() {
//   const location = useLocation();

//   const menu = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Activity", path: "/activity" },
//     { name: "Users", path: "/users" },
//     { name: "Reports", path: "/reports" },
//     { name: "Settings", path: "/settings" },
//   ];

//   return (
//     <div className="sidebar">
//       <h2>Admin</h2>

//       {menu.map((item, i) => (
//         <Link
//           key={i}
//           to={item.path}
//           className={location.pathname === item.path ? "active" : ""}
//         >
//           {item.name}
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Sidebar;











import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Activity", path: "/admin/activity" },
    { name: "Users", path: "/admin/users" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="sidebar">
      <h2>Admin</h2>

      {menu.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "menu active" : "menu"
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;