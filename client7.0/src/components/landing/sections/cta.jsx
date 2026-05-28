"use client";

import { useRouter } from "next/navigation";

import styles from "./section.module.css";

export default function Cta() {
  const router = useRouter();
  return (
    <section id="contact" className={styles.cta}>
      <h2 className={styles.ctaTitle}>Ready to Transform Your Library?</h2>

      <p className={styles.ctaText}>
        Join thousands of libraries using Dora to streamline operations and
        enhance member experience
      </p>

      <div className={styles.ctaButtons}>
        <button
          onClick={() => router.push("/auth")}
          className={styles.ctaBtnPrimary}
        >
          Start Free 30-Day Trial
        </button>

        <button className={styles.ctaBtnOutline}>Schedule a Demo</button>
      </div>
    </section>
  );
}
