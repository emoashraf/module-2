import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./layout.css";
function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
        navigate("/app/logout");
  };
  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="logo">CoreDash</h2>
        <ul>
          <li onClick={() => navigate("/app/dashboard")}> Dashboard</li>
          <li onClick={() => navigate("/app/profile")}> Profile</li>
          <li onClick={() => navigate("/app/logout")}> Logout</li>
        </ul>
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;