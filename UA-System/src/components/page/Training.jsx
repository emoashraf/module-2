
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Training.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Training() {
  const navigate = useNavigate();

  const targetText =
    "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

  const [input, setInput] = useState("");
  const [keystrokes, setKeystrokes] = useState([]);
  const [mouseData, setMouseData] = useState([]);
  const [time, setTime] = useState(150); // seconds
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const keyDownTimes = useRef({});
  const lastKeyTime = useRef(null);

  const userId = localStorage.getItem("userId") || "guest_user";

  useEffect(() => {
    const done = localStorage.getItem("trainingCompleted");

    if (done === "true") {
      navigate("/app/dashboard", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    let timer;

    if (isTyping && time > 0) {
      timer = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTyping, time]);

  const handleKeyDown = (e) => {
    const now = Date.now();
    keyDownTimes.current[e.key] = now;

    const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, type: "down", time: now, delayFromLastKey: delay },
    ]);

    lastKeyTime.current = now;
  };

  const handleKeyUp = (e) => {
    const now = Date.now();
    const holdTime = now - (keyDownTimes.current[e.key] || now);

    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, type: "up", time: now, holdTime },
    ]);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (!isTyping) setIsTyping(true);
  };

  useEffect(() => {
    const move = (e) =>
      setMouseData((prev) => [
        ...prev,
        { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
      ]);

    const click = (e) =>
      setMouseData((prev) => [
        ...prev,
        { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
      ]);

    const scroll = () =>
      setMouseData((prev) => [
        ...prev,
        { type: "scroll", scrollY: window.scrollY, time: Date.now() },
      ]);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const characters = input.length;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.warning("⚠️ Please start typing!");
      return;
    }

    const payload = {
      userId,
      module: "training",
      targetText,
      typedText: input,
      keystrokes,
      mouseData,
      words,
      characters,
      timeTaken: 150 - time,
      timestamp: Date.now(),
    };

    try {
      const res = await fetch("http://localhost:5000/training-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("✅ Training Completed!");

        localStorage.setItem("trainingCompleted", "true");
        setIsCompleted(true);

        setTimeout(() => {
          navigate("/app/dashboard", { replace: true });
        }, 800);
      } else {
        toast.error("❌ Server error!");
      }
    } catch (err) {
      console.log(err);
      toast.error("❌ Server error!");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    toast.error("❌ Paste not allowed!");
  };

  if (isCompleted) {
    return (
      <div className="training-page disabled-mode">
        <h2>🚫 Training Completed</h2>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="training-page">
      <h2>Keystroke Training</h2>

      {/* TIMER */}
      <h1 className="timer">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h1>

      <p className="sentence">{targetText}</p>

      <textarea
        value={input}
        placeholder="Start typing the given sentence here..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
        disabled={time === 0}
      />

      <div className="stats">
        <span>Words: {words}</span>
        <span>Characters: {characters}</span>
      </div>

      <button className="submit" onClick={handleSubmit}>
        Submit Data
      </button>

      <ToastContainer />
    </div>
  );
}

export default Training;