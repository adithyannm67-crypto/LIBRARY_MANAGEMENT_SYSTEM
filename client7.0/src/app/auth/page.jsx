"use client";

import "./page.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import Login from "./component/login/page";
import Signup from "./component/signup/page";

export default function LoginSignup({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="container">
      <div className="wrapper">
        {/* Logo */}
        <div className="logo">
          <div className="logo-row">
            <BookOpen className="logo-icon" />
            <span className="logo-text">Dora Library</span>
          </div>
          <p className="logo-subtext">Library Management System</p>
        </div>

        {/* Card */}
        <div className="card">
          {/* Tabs */}
          <div className="tabs">
            <button
              onClick={() => setIsLogin(true)}
              className={`tab-btn ${isLogin ? "active" : ""}`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`tab-btn ${!isLogin ? "active" : ""}`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {isLogin ? <Login /> : <Signup />}
        </div>

        {/* Footer */}
        <div className="footer">
          <button
            onClick={() => {
              if (onBack) onBack();
              else router.push("/");
            }}
            className="back-btn"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
