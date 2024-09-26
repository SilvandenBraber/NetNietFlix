import React from "react";

import { CircularProgressbar } from "react-circular-progressbar";

import styles from "./progressbar.module.css";
import "react-circular-progressbar/dist/styles.css";

function ProgressBar({ voteAverage }) {
  const percentage = Math.ceil(voteAverage * 10);

  return (
    <div className={styles.progressBarContainer}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        className={styles.progressBar}
        styles={{
          path: {
            stroke: "#db1b28",
            transform: "rotate(0.5)",
            strokeWidth: "14px",
            strokeLinecap: "round",
            transitionDuration: "1s",
          },
          text: {
            fill: "white",
            fontSize: "20px",
            fontWeight: "500",
          },
          trail: {
            stroke: "#313639",
            strokeWidth: "20px",
            strokeLinecap: "butt",
          },
        }}
      />
      <p className={styles.userScoreTitle}>
        User
        <br />
        score
      </p>
    </div>
  );
}

export default ProgressBar;
