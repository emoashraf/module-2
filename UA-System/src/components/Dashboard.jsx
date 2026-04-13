import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [trainingDone, setTrainingDone] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const status = localStorage.getItem("trainingCompleted");
    setTrainingDone(status === "true");
  }, []);

  return (
    <>
      <h2>Welcome, {user?.name} 👋</h2>

      <div className="cards">

        <div className="card training">
          <h3>Training Model</h3>
          <p>Train your typing behavior</p>

          <button
            onClick={() => navigate("/app/training")}
            disabled={trainingDone}
          >
            {trainingDone ? "Completed ✅" : "Start Training"}
          </button>

          <p className="status">
            Status: {trainingDone ? "✅ Done" : "❌ Not Done"}
          </p>
        </div>

        <div className="card exam">
          <h3>Online Exam</h3>
          <p>Real-time monitoring test</p>

          <button
            onClick={() => navigate("/app/exam")}
            disabled={!trainingDone}
          >
            {trainingDone ? "Start Exam" : "Locked 🔒"}
          </button>

          <p className="status">
            Status: {trainingDone ? "🔓 Unlocked" : "🔒 Locked"}
          </p>
        </div>

      </div>
    </>
  );
}

export default Dashboard;