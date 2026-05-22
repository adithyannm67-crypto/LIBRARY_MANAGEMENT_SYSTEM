

import { useRouter } from "next/navigation";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import Features from "./components/features/features";
import Cta from "./components/cta/cta";
import Footer from "./components/footer/footer";
import Benefits from "./components/benefits/benefits";


import "./page.module.css";

export default function Page() {
  const router = useRouter();

  return (
    <div className="page">
      <Navbar  />

      <Hero />

      <Features />

      <Benefits />

      <Cta />

      <Footer />
    </div>
  );
}
