import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Min 3 characters required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Min 6 characters required";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Add at least 1 special character";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, 
          email,
          password
        })
      });

      const result = await res.json();

      if (result.status === "saved") {
        toast.success("Registered Successfully ✅", {
          onClose: () => navigate("/")
        });
      } else {
        toast.error("Register failed ❌");
      }

    } catch (err) {
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="register-page">

    <div className="register-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.username}
        </p>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.email}
        </p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.password}
        </p>
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.confirmPassword}
        </p>
      )}
      <button onClick={handleRegister}>Register</button>
      <p onClick={() => navigate("/")}>
        Already user? Login
      </p>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeButton={false}
        pauseOnHover={false}
        draggable={false}
      />
    </div>
    
    </div>
  );
}

export default Register;