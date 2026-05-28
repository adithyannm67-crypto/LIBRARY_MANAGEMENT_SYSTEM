import styles from "./section.module.css";

import FooterSection from "../components/footerSections";

import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerSection}>
          <div className={styles.footerBrand}>
            <div className={styles.iconBox}>
              <BookOpen className={styles.footerIcon} />
            </div>
            <span className={styles.logoText}>Dora Library</span>
          </div>
          <p className={styles.footerText}>
            Modern library management for the digital age
          </p>
        </div>

        <FooterSection
          title="Product"
          links={["Features", "Pricing", "Demo"]}
        />

        <FooterSection title="Company" links={["About", "Blog", "Careers"]} />

        <FooterSection
          title="Support"
          links={["Help Center", "Contact", "Privacy"]}
        />
      </div>

      <div className={styles.footerBottom}>
        © 2026 Dora Library Management System. All rights reserved.
      </div>
    </footer>
  );
}
