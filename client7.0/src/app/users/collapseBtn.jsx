"use client";

import { ArrowRight } from "lucide-react";

import { useAppData } from "#root/providers/AppDataContext.jsx";

const CollapseBtn = () => {
  const { setIsOpen } = useAppData();
  return (
    <button
      id="collapseBtn"
      className="collapseBtn"
      onClick={(e) => {
        setIsOpen((prev) => !prev);
        e.stopPropagation();
      }}
    >
      <ArrowRight />
    </button>
  );
};
export default CollapseBtn;
