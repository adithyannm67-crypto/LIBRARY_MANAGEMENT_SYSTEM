import styles from "./component.module.css";
export default function FeatureCard({ Icon,title, text }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIconBox}>
        <Icon className={styles.featureIcon} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>
        {text}
      </p>
    </div>
  );
}
