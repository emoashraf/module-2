import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin",
    password: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Settings Saved 🔥");
  };

  return (
    <>
      <h2>Settings</h2>

      <div className="settings-box">
        <label>Admin Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <label>Change Password</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
        />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </>
  );
}

export default Settings;