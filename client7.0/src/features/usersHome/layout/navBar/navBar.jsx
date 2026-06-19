"use client";
import style from "./navbar.module.css";

import { BookOpen } from "lucide-react";
import ButtonContainer from "./clientComponents";

import { getDashBoardHeadings } from "#root/shared/utils/common.jsx";

export default function NavBar() {
  const { headerSubTitle, headerTitle } = getDashBoardHeadings();

  return (
    <header className={style.navBar}>
      <div className={style.headerLeft}>
        <div className={style.headerIconBox}>
          <BookOpen className={style.headerIcon} />
        </div>
        <div className={style.headerContent}>
          <h3 style={{ margin: 0, fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>
            {headerTitle}
          </h3>
          <p className={style.headerSubtitle} style={{ width: "80%" }}>
            {headerSubTitle}
          </p>
        </div>
      </div>
      <div className={style.headerRight}>
        <ButtonContainer />
      </div>
    </header>
  );
}
