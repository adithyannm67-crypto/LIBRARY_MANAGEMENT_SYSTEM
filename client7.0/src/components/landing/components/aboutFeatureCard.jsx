import styles from "./component.module.css";
import { Zap } from "lucide-react";
export default function FeatureCard({ title, description }) {
  return (
    <div className={styles.aboutFeature}>
      <div className={styles.aboutIconBox}>
        <Zap className={styles.aboutIcon} />
      </div>
      <div>
        <h4 className={styles.aboutFeatureTitle}>{title}</h4>
        <p className={styles.aboutFeatureText}>{description}</p>
      </div>
    </div>
  );
}
