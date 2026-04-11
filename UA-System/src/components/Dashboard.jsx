
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  if (!user) {
    navigate("/");
  }
}, [user]);

  return (
    <>
      <h2>Welcome, {user?.name} 👋</h2>
      <div className="cards">
         <div className="card training">
            <h3>Training Model</h3>
             <p>Train your typing behavior</p>
             {/* <button onClick={() => navigate("/training")}> */}
             <button onClick={() => navigate("/app/training")}>
             Start Training
           </button>
            <p className="status">Status: ❌ Not Done</p>
          </div>
          {/* 🧪 EXAM CARD */}
          <div className="card exam">
            <h3>Online Exam</h3>
           <p>Real-time monitoring test</p>
           <button disabled>
              Start Exam
            </button>
            <p className="status">Status: 🔒 Locked</p>
          </div>
      </div>
    </>
  );
}

export default Dashboard;