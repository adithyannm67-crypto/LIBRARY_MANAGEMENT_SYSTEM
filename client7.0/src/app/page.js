import Navbar from "#root/features/landing/sections/navbar.jsx";
import Hero from "#root/components/landing/sections/hero";
import Features from "#root/components/landing/sections/features";
import Cta from "#root/components/landing/sections/cta";
import Footer from "#root/components/landing/sections/footer";
import Benefits from "#root/components/landing/sections/benefits";

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
