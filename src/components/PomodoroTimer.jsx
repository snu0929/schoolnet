import React, { useState, useEffect } from "react";
import CircularProgressIndicator from "./CircularProgressIndicator";
import styles from "./PomodoroTimer.module.css";
import { FaPlay, FaPause, FaRedo, FaPlus, FaMinus } from "react-icons/fa";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default work session
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsWorkSession(!isWorkSession);
      setTimeLeft(isWorkSession ? breakDuration : workDuration);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkSession, workDuration, breakDuration]);

  const startStopTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkSession ? workDuration : breakDuration);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const percentage =
    (timeLeft / (isWorkSession ? workDuration : breakDuration)) * 100;

  return (
    <div className={styles.timerContainer}>
      <h1 className={styles.heading}>
        {isWorkSession ? "Work Time" : "Break Time"}
      </h1>
      <CircularProgressIndicator percentage={percentage} />
      <div className={styles.timerDisplay}>{formatTime(timeLeft)}</div>
      <div className={styles.buttonContainer}>
        <button
          onClick={startStopTimer}
          className={styles.startStopButton}
          data-tooltip={isRunning ? "Pause the timer" : "Start the timer"}
        >
          <FaPlay
            className={`${styles.icon} ${!isRunning ? styles.iconVisible : ""}`}
          />
          <FaPause
            className={`${styles.icon} ${isRunning ? styles.iconVisible : ""}`}
          />
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className={styles.resetButton}
          data-tooltip="Reset the timer"
        >
          <FaRedo className={styles.icon} />
          Reset
        </button>
      </div>
      <div className={styles.durationControls}>
        <label>
          Work Duration (minutes):
          <div className={styles.durationInputContainer}>
            <FaMinus
              className={styles.icon}
              onClick={() => setWorkDuration((prev) => Math.max(prev - 60, 60))}
            />
            <input
              type="number"
              value={workDuration / 60}
              onChange={(e) => setWorkDuration(e.target.value * 60)}
            />
            <FaPlus
              className={styles.icon}
              onClick={() =>
                setWorkDuration((prev) => Math.min(prev + 60, 1200))
              }
            />
          </div>
        </label>
        <label>
          Break Duration (minutes):
          <div className={styles.durationInputContainer}>
            <FaMinus
              className={styles.icon}
              onClick={() =>
                setBreakDuration((prev) => Math.max(prev - 60, 60))
              }
            />
            <input
              type="number"
              value={breakDuration / 60}
              onChange={(e) => setBreakDuration(e.target.value * 60)}
            />
            <FaPlus
              className={styles.icon}
              onClick={() =>
                setBreakDuration((prev) => Math.min(prev + 60, 600))
              }
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default PomodoroTimer;
