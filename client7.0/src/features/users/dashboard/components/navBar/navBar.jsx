"use client";
import style from "./navbar.module.css";

import { BookOpen, ArrowRight ,Menu} from "lucide-react";
import ButtonContainer from "./clientComponents";
import { useSideBar } from "#root/context/sideBar.Context.jsx";

import { getDashBoardHeadings } from "#root/common.jsx";

export default function NavBar() {
  const { setIsOpen } = useSideBar();

  const { headerSubTitle, headerTitle } = getDashBoardHeadings();

  return (
    <header className={style.navBar}>
      <div className={style.headerLeft}>
        <button
          id="collapseBtn"
          className="collapseBtn"
          onClick={(e) => {
            setIsOpen((prev) => !prev);
            e.stopPropagation();
          }}
        >
          <Menu size={30} />
        </button>
        <div className={style.headerIconBox}>
          <BookOpen className={style.headerIcon} />
        </div>
        <div className={style.headerContent}>
          <h3>{headerTitle}</h3>
          <p className={style.headerSubtitle}>{headerSubTitle}</p>
        </div>
      </div>
      <div className={style.headerRight}>
        <ButtonContainer />
      </div>
    </header>
  );
}
