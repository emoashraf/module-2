

import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [typingText, setTypingText] = useState("");
  const [keystrokes, setKeystrokes] = useState([]);
  const [mouseMoves, setMouseMoves] = useState([]);
  const [keyDownTime, setKeyDownTime] = useState({});

  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef(null);

  // 🔥 KEYBOARD TRACK
  const handleKeyDown = (e) => {
    if (!isTracking) return;

    setKeyDownTime((prev) => ({
      ...prev,
      [e.key]: Date.now()
    }));
  };

  const handleKeyUp = (e) => {
    if (!isTracking) return;

    const releaseTime = Date.now();
    const pressTime = keyDownTime[e.key];

    if (pressTime) {
      const holdTime = releaseTime - pressTime;

      setKeystrokes((prev) => [
        ...prev,
        { key: e.key, holdTime, time: releaseTime }
      ]);
    }
  };

  // 🔥 MOUSE TRACK
  const handleMouseMove = (e) => {
    if (!isTracking) return;

    setMouseMoves((prev) => [
      ...prev,
      {
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      }
    ]);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTracking]);

  // 🔥 REGISTER
  const handleRegister = async () => {
    if (!email || !password || !typingText) {
      toast("Fill all details");
      return;
    }

    setIsTracking(false);

    const data = {
      email,
      password,
      typedText: typingText,
      keystrokes,
      mouseMoves
    };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.status === "saved") {
        toast.success("Registered Successfully ✅", {
          onClose: () => {
            setIsRegister(false); // 🔥 after toast close

            setTypingText("");
            setKeystrokes([]);
            setMouseMoves([]);
          }
        });

      } else {
        toast("Register failed ❌");
      }

    } catch (err) {
      toast("Server error ❌");
    }
  };

  // 🔥 LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      toast("Enter details");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (result.status === "success") {
        toast.success("Login success ✅", {
          onClose: () => {
            setIsTracking(true);
            navigate("/dashboard");
          }
        });

        if (!intervalRef.current) {
          intervalRef.current = setInterval(async () => {
            const data = {
              email,
              keystrokes,
              mouseMoves
            };

            await fetch("http://localhost:5000/monitor", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            });

            setKeystrokes([]);
            setMouseMoves([]);
          }, 10000);
        }

      } else {
        toast("Login failed ❌");
      }

    } catch (err) {
      toast("Server error ❌");
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegister && (
        <>
          <p style={{ color: "orange" }}>
            Type here (keyboard + mouse will be tracked)
          </p>

          <textarea
            placeholder="Type something..."
            value={typingText}
            onChange={(e) => {
              setTypingText(e.target.value);
              setIsTracking(true);
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            rows="4"
            style={{ width: "100%", marginTop: "10px" }}
          />
        </>
      )}

      <button onClick={isRegister ? handleRegister : handleLogin}>
        {isRegister ? "Register" : "Login"}
      </button>

      <p
        onClick={() => setIsRegister(!isRegister)}
        style={{ cursor: "pointer" }}
      >
        {isRegister ? "Already user? Login" : "New user? Register"}
      </p>

      <p>🔒 Continuous behavior monitoring enabled</p>

      {/* 🔥 TOAST CONFIG */}
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        pauseOnHover={false}
        draggable={false}
        theme="light"
      /> */}
      <ToastContainer position="top-right" autoClose={3000}
      closeButton={false}
        pauseOnHover={false}
        draggable={false}
       />
    </div>
  );
}


const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none"
  }
};

export default Login;