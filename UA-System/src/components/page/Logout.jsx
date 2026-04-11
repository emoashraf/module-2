import { useNavigate } from "react-router-dom";
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleConfirm = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/app/dashboard");
  };

  return (
    <div className="logout-page">
  <div className="logout-card">

    <h2>⚠️ Logout</h2>

    <p>
      Are you sure you want to logout, <b>{user?.name}</b>?
    </p>

    <p className="warning">
      ⚠️ Once you logout, you will NOT be able to login again.
    </p>

    <div className="btns">
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleConfirm}>Yes, Logout</button>
    </div>

  </div>
</div>
  );
}

export default Logout;