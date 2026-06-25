import styles from "./section.module.css";

import FeatureCard from "../components/aboutFeatureCard";
import StatsCard from "../components/aboutStatsCard";

export default function Benefits() {
  return (
    <section id="about" className={styles.about}>
      {/* Left */}
      <div>
        <h2 className={styles.aboutTitle}>Why Choose Dora?</h2>

        <p className={styles.aboutDescription}>
          Trusted by over 2,000 libraries worldwide, Dora combines ease of use
          with powerful functionality to help you deliver exceptional library
          services.
        </p>

        <div className={styles.aboutFeatures}>
          <FeatureCard
            title="Lightning Fast"
            description="Process checkouts and returns in seconds with our optimized system"
          />
          <FeatureCard
            title="Secure & Reliable"
            description="Bank-level security with automatic backups and 99.9% uptime"
          />
          <FeatureCard
            title="Mobile Ready"
            description="Access your library from anywhere with our responsive design"
          />
        </div>
      </div>

      {/* Right */}
      <div className={styles.aboutStats}>
        <StatsCard number="2,000+" label="Active Libraries" />
        <StatsCard number="500K+" label="Books Cataloged" />
        <StatsCard number="98%" label="Customer Satisfaction" />
      </div>
    </section>
  );
}
