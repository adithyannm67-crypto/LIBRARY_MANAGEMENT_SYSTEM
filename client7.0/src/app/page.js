import Navbar from "#root/features/landing/sections/navbar.jsx";
import Hero from "#root/features/landing/sections/hero";
import Features from "#root/features/landing/sections/features";
import Cta from "#root/features/landing/sections/cta";
import Footer from "#root/features/landing/sections/footer";
import Benefits from "#root/features/landing/sections/benefits";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <Navbar />

      <Hero />

      <Features />

      <Benefits />

      <Cta />

      <Footer />
    </div>
  );
}
