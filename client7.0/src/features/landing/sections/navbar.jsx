"use client";

import styles from "./section.module.css";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { BookOpen, Menu } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isDropDown, setIsDropDown] = useState(false);
  const dropDownref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropDownref.current && !dropDownref.current.contains(e.target)) {
        setIsDropDown(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 510) {
        setIsDropDown(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div className={styles.iconBox}>
          <BookOpen className={styles.icon} />
        </div>
        <h3 className={styles.logoText}>Dora Library</h3>
      </div>

      <div className={styles.navbarRight} ref={isDropDown ? dropDownref : null}>
        <button
          onClick={() => {
            setIsDropDown((prev) => !prev);
          }}
          className={styles.menuBtn}
        >
          <Menu />
        </button>

        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div
          className={styles.asDropDown + " " + (isDropDown ? styles.open : "")}
        >
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          onClick={() => router.push("/auth")}
          className={styles.getStartedBtn}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
