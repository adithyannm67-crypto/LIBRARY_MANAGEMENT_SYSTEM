"use client";

import styles from "./page.module.css";
import commonStyle from "@/shared/styles/common.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import Login from "#root/features/auth/login/page.jsx";
import Signup from "#root/features/auth/signup/page";

export default function LoginSignup({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoRow}>
            <BookOpen className={styles.logoIcon} />
            <span className={styles.logoText}>Dora Library</span>
          </div>
          <p className={styles.logoSubtext}>Library Management System</p>
        </div>

        {/* Card */}
        <div className={styles.card}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              onClick={() => setIsLogin(true)}
              className={styles.tabBtn + " " + (isLogin ? styles.active : "")}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={styles.tabBtn + " " + (!isLogin ? styles.active : "")}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {isLogin ? <Login /> : <Signup />}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            onClick={() => {
              if (onBack) onBack();
              else router.push("/");
            }}
            className={commonStyle.backBtn}
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
