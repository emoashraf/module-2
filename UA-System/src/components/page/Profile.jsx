import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [trainingDone, setTrainingDone] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("trainingCompleted");
    setTrainingDone(status === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleReset = () => {
    localStorage.removeItem("trainingCompleted");
    setTrainingDone(false);
  };

  return (
    <div className="profile">

      <h2>👤 Profile</h2>

      <div className="card">
        <h3>Personal Info</h3>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      <div className="card">
        <h3>Training Details</h3>
        <p>Sessions: {trainingDone ? "Completed" : "0"}</p>
        <p>
          Status: {trainingDone ? "✅ Completed" : "❌ Not Started"}
        </p>
      </div>

      <div className="card">
        <h3>Exam Details</h3>
        <p>Last Exam: Not Taken</p>
        <p>
          Status: {trainingDone ? "🔓 Unlocked" : "🔒 Locked"}
        </p>
      </div>

    </div>
  );
}

export default Profile;