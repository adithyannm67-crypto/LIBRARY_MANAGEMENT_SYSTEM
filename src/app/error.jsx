"use client";

import commonStyle from "@/shared/styles/common.module.css";
import Link from "next/link";
import { RotateCcw, ShieldAlert } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="errorContainer">
      <div className="errorState">
        {" "}
        <ShieldAlert size={32} />
        <h2>Something went wrong</h2>
        <p>
          {error.message}.
          <br />
          Please try again or return to login.
        </p>
        <div className="errorActions">
          <button className={commonStyle.btnPrimary} onClick={() => reset()}>
            <RotateCcw size={12} /> Retry
          </button>
          <Link className={commonStyle.backBtn} href="/auth">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
