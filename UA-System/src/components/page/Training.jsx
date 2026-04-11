
import React, { useState, useEffect, useRef } from "react";
import "./Training.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Training() {
  const targetText =
    "The quick brown fox jumps over the lazy dog while typing continuously with different speeds, using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";
  const [input, setInput] = useState("");
  const [keystrokes, setKeystrokes] = useState([]);
  const [mouseData, setMouseData] = useState([]);
  const [time, setTime] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const keyDownTimes = useRef({});
  const lastKeyTime = useRef(null);
  useEffect(() => {
    let timer;
    if (isTyping && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTyping, time]);

  const handleKeyDown = (e) => {
    const now = Date.now();

    keyDownTimes.current[e.key] = now;

    const delay = lastKeyTime.current
      ? now - lastKeyTime.current
      : 0;

    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, type: "down", time: now, delayFromLastKey: delay }
    ]);

    lastKeyTime.current = now;
  };
  const handleKeyUp = (e) => {
    const now = Date.now();
    const downTime = keyDownTimes.current[e.key];

    const holdTime = downTime ? now - downTime : 0;

    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, type: "up", time: now, holdTime }
    ]);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    const move = (e) => {
      setMouseData((prev) => [
        ...prev,
        { type: "move", x: e.clientX, y: e.clientY, time: Date.now() }
      ]);
    };
    const click = (e) => {
      setMouseData((prev) => [
        ...prev,
        { type: "click", x: e.clientX, y: e.clientY, time: Date.now() }
      ]);
    };
    const scroll = () => {
      setMouseData((prev) => [
        ...prev,
        { type: "scroll", scrollY: window.scrollY, time: Date.now() }
      ]);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  const words = input.trim().split(" ").filter(Boolean).length;
  const characters = input.length;
  const speed = words;
  const isMatch =
    input.trim().toLowerCase() === targetText.trim().toLowerCase();
  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.warning("⚠️ Please start typing!");
      return;
    }
    if (!isMatch) {
      toast.error("❌ Please complete the full sentence correctly!");
      return;
    }
    const payload = {
      text: input,
      keystrokes,
      mouseData,
      words,
      characters,
      speed
    };
    console.log("Sending:", payload);
    try {
      await fetch("http://localhost:5000/training-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      toast.success("✅ Training submitted successfully!");
      setInput("");
      setKeystrokes([]);
      setMouseData([]);
      setIsCompleted(true);
    } catch {
      toast.error("❌ Server error!");
    }
  };
  if (isCompleted) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        ✅ Training Completed (You cannot access again)
      </h2>
    );
  }
  return (
    <div className="training-page">
      <h2>Typing Training</h2>
      <h1 className="timer">
        00:{time < 10 ? `0${time}` : time}
      </h1>
      <p className="sentence">{targetText}</p>
      <textarea
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        disabled={time === 0}
      />
      <div className="stats">
        <span>Words: {words}</span>
        <span>Characters: {characters}</span>
        <span>Speed: {speed} WPM</span>
      </div>
      <button className="submit" onClick={handleSubmit}>
        Submit Training
      </button>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Training;
