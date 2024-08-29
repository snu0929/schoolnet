// CircularProgressIndicator.jsx
import React from "react";
import styles from "./CircularProgressIndicator.module.css";

const CircularProgressIndicator = ({ percentage }) => {
  const radius = 50; // Radius of the circle
  const stroke = 10; // Stroke width of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.container}>
      <svg className={styles.circularProgress} width="120" height="120">
        <circle
          className={styles.backgroundCircle}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className={styles.progressCircle}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.percentageText}>{Math.round(percentage)}%</div>
    </div>
  );
};

export default CircularProgressIndicator;
