
"use client";

import { BookOpen } from "lucide-react";
import "./navbar.css";


export default function Navbar({ router }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <BookOpen className="icon" />
            <span className="logo-text">Dora Library</span>
          </div>

          <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>

            <button onClick={() => router.push("/auth")} className="btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
