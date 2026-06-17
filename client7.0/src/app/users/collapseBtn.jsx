"use client";

import { ArrowRight as RightArrow } from "lucide-react";

import { useAppData } from "#root/context/AppDataContext.jsx";

const CollapseBtn = () => {
    const { isOpen, setIsOpen } = useAppData();
  return (
    <button
      id="collapseBtn"
      className="collapseBtn"
      onClick={(e) => {
        setIsOpen(!isOpen);
        e.stopPropagation();
      }}
    ></button>
  );
};
export default CollapseBtn;
