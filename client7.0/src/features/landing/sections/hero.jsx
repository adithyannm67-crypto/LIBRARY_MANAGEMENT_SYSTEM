import styles from "./section.module.css";
export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Modern Library Management
        <br />
        Made Simple
      </h1>
      <p className={styles.heroText}>
        Streamline your library operations with Dora - the complete solution for
        cataloging, circulation, and member management. Built for libraries of
        all sizes.
      </p>
    </section>
  );
}
