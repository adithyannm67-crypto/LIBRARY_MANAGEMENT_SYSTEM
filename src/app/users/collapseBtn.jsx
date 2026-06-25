"use client";

import { ArrowRight } from "lucide-react";

import { useSideBar } from "#root/context/sideBar.Context.jsx";

const CollapseBtn = () => {
  const { setIsOpen } = useSideBar();
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
