import style from "./page.module.css"
import{Skeleton, SkeletonText} from "#root/components/skeletons";
export default function ReadingGoalSection({ loading }) {
  if (loading) {
    return (
      <div className={style.card}>
        
        <Skeleton width="310px" height="170px" />
      </div>
    );
  }
  return (
    <div className={style.card}>
      <h3 className={style.cardTitle}>Reading Goal 2026</h3>

      <div className={style.goal}>
        <div className={style.goalHeader}>
          <span>12 of 24 books</span>
          <span>50%</span>
        </div>

        <div className={style.progressBar}>
          <div className={style.progressFill} style={{ width: "50%" }} />
        </div>

        <p className={style.goalText}>
          You're on track! Keep reading to reach your goal.
        </p>
      </div>
    </div>
  );
}