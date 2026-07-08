"use client";
import styles from "../styles/readingGoal.module.css";
import { useState } from "react";
import { Target, Check } from "lucide-react";

export default function ReadingGoal() {
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState("24");
  //for a new user i want to ask for setting a reading goal
  return (
    <div className={styles.readingGoalContainer}>
      <div className={styles.goalHeader}>
        <h3 className={styles.goalTitle}>
          <Target className={styles.goalIcon} />
          2026 Reading Goal
        </h3>

        <button
          onClick={() => setEditingGoal(!editingGoal)}
          className={styles.goalButton}
        >
          {editingGoal ? "Cancel" : "Edit goal"}
        </button>
      </div>
      {editingGoal && (
        <div className={styles.goalEdit}>
          <input
            type="number"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            className={styles.goalInput}
          />

          <span className={styles.goalLabel}>books this year</span>

          <button
            onClick={() => setEditingGoal(false)}
            className={styles.saveButton}
          >
            <Check className={styles.saveIcon} />
            Save
          </button>
        </div>
      )}

      <div className={styles.goalProgress}>
        <div className={styles.goalStats}>
          <span className={styles.goalCurrent}>12 of {goalInput} books</span>

          <span className={styles.goalPercentage}>
            {Math.round((12 / parseInt(goalInput || "1")) * 100)}%
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{
              width: `${Math.min(
                (12 / parseInt(goalInput || "1")) * 100,
                100,
              )}%`,
            }}
          />
        </div>

        <p className={styles.goalMessage}>
          You need{" "}
          <strong className={styles.goalRemaining}>
            {Math.max(0, parseInt(goalInput || "0") - 12)} more books
          </strong>{" "}
          by Dec 31 — about 2 per month to stay on track.
        </p>
      </div>
    </div>
  );
}
