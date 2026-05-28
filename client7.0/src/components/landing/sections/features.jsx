import styles from "./section.module.css";

import FeatureCard from "../components/featuresFeatureCard";

import { Search, Users, BarChart3, Clock } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.featuresHeader}>
        <h2 className={styles.featuresTitle}>Powerful Features</h2>
        <p className={styles.featuresSubtitle}>
          Everything you need to manage your library efficiently
        </p>
      </div>

      <div className={styles.featuresGrid}>
        <FeatureCard
          Icon={Search}
          title="Smart Catalog"
          text="Advanced search and cataloging system with barcode scanning and ISBN lookup"
        />
        <FeatureCard
          Icon={Users}
          title="Member Management"
          text="Track members, borrowing history, and automate notifications and reminders"
        />
        <FeatureCard
          Icon={BarChart3}
          title="Analytics & Reports"
          text="Comprehensive insights into circulation, popular books, and usage patterns"
        />
        <FeatureCard
          Icon={Clock}
          title="Automated Workflows"
          text="Set up automatic reminders, overdue notices, and reservation notifications"
        />
      </div>
    </section>
  );
}
