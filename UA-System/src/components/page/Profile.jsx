import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile">

      <h2>👤 Profile</h2>

      {/* User Info */}
      <div className="card">
        <h3>Personal Info</h3>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      {/* Training Info */}
      <div className="card">
        <h3>Training Details</h3>
        <p>Sessions: 3</p>
        <p>Status: ✅ Completed</p>
      </div>

      {/* Exam Info */}
      <div className="card">
        <h3>Exam Details</h3>
        <p>Last Exam: Not Taken</p>
        <p>Status: 🔒 Locked</p>
      </div>

      {/* Actions */}
      <div className="card">
        <h3>Actions</h3>
        <button>Reset Training</button>
        <button>Logout</button>
      </div>

    </div>
  );
}

export default Profile;