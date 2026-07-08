import styles from "./page.module.css";

import * as Icons from "lucide-react";

const Check = Icons.Check;

import { fetchAchievementsData } from "#root/lib/server/services/users.service.js";

//for achievemnt goal crusher thresold should be user specifc

export default async function AchiveMentsTab() {
  const achievements = await fetchAchievementsData();

  return (
    <div>
      <div className={styles.achievementHeader}>
        <p className={styles.achievementStats}>
          {achievements.filter((a) => a.earned).length} of {achievements.length}{" "}
          earned
        </p>
      </div>

      <div className={styles.achievementGrid}>
        {achievements.map((a) => {
          const Icon = Icons[a.icon];

          return (
            <div
              key={a.label}
              className={`${styles.achievementCard} ${
                a.earned
                  ? styles.achievementCardEarned
                  : styles.achievementCardLocked
              }`}
            >
              <div className={styles.achievementContent}>
                <div className={styles.achievementIconWrapper}>
                  <Icon
                    className={styles.achievementIcon}
                    style={{
                      color: a.earned ? a.color : "var(--muted-foreground)",
                    }}
                  />
                </div>

                <div className={styles.achievementInfo}>
                  <div className={styles.achievementTitleRow}>
                    <p className={styles.achievementTitle}>{a.label}</p>

                    {a.earned && (
                      <span className={styles.earnedBadge}>
                        <Check className={styles.earnedIcon} />
                        Earned
                      </span>
                    )}
                  </div>

                  <p className={styles.achievementDescription}>{a.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
