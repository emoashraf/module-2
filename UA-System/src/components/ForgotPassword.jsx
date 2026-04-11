import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (!email || !newPassword || !confirmPassword) {
      toast.error("Fill all fields ❗");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword })
      });

      const result = await res.json();

      if (result.status === "success") {
        toast.success("Password reset successful ✅", {
          onClose: () => navigate("/")
        });
      } else {
        toast.error("User not found ❌");
      }

    } catch {
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="login-container">
      <h2>Reset Password</h2>

      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>

      <p className="back-login" onClick={() => navigate("/")}>← Back to Login</p>
      <ToastContainer />
    </div>
  );
}
export default ForgotPassword;