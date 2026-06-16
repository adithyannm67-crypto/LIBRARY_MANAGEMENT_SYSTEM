"use client";

import "./users.css"
import commonStyle from "#root/common.module.css";
import Link from "next/link";
import { TriangleAlert, RotateCcw } from "lucide-react";

export default function Error({ error , reset}) {
  return (
    <div className="errorContainer">
      <TriangleAlert size={32} />
      <h2>Something went wrong</h2>
      <p>
        {error.message}.
        <br />
        Please try again or return to login.
      </p>

      <div className="errorActions">
        <button
          className={commonStyle.btnPrimary}
          onClick={() => reset()}
        >
          <RotateCcw size={12} /> Retry
        </button>
        <Link
          className={commonStyle.backBtn}
          href="/auth"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.clear();
          }}
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}
