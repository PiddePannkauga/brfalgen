import type { NextComponentType } from "next";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import cn from "classnames";
import React, { useEffect, useState } from "react";

export const Header: NextComponentType = (props) => {
  const [isNavOpen, setisNavOpen] = useState(true);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleNavbarOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setisNavOpen(!isNavOpen);
  };

  const handleStickyHeaderOnScroll = (isDesktop: boolean) => {
    if (showMenuButton) {
      if (isDesktop && window.scrollY < 140) {
        setShowMenuButton(false);
        setisNavOpen(true);
      } else if (window.scrollY < 170) {
        setShowMenuButton(false);
        setisNavOpen(true);
      }
    }
  };

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 920);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const responsiveThreshold = isDesktop ? 0.6 : 0.3;
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio < responsiveThreshold) {
          setShowMenuButton(true);
          setisNavOpen(false);
        }
      },
      { threshold: responsiveThreshold }
    );
    const navbar = document.querySelector(`.${styles.navbar}`);
    navbar && observer.observe(navbar);

    window.addEventListener("scroll", () =>
      handleStickyHeaderOnScroll(isDesktop)
    );

    return () => {
      navbar && observer.unobserve(navbar);
      window.removeEventListener("scroll", () =>
        handleStickyHeaderOnScroll(isDesktop)
      );
    };
  }, [showMenuButton]);

  return (
    <nav className={cn(styles.header, { [styles.sticky]: showMenuButton })}>
      {!showMenuButton && (
        <Link href={"/"}>
          <h1>Välkommen till BRF Älgen</h1>
        </Link>
      )}
      {showMenuButton ? (
        <button
          className={isNavOpen ? styles.closebutton : styles.menubutton}
          onClick={(e) => handleNavbarOpen(e)}
        ></button>
      ) : null}

      <div
        className={styles.navbar}
        style={isNavOpen ? { display: "flex" } : { display: "none" }}
      >
        <Link href={"/"}>Hem</Link>
        <Link href={"/about"}>Om Föreningen</Link>

        <Link href={"/boendeinfo"}>Boendeinfo</Link>

        <Link href={"/contact"}>Kontakt</Link>

        <Link href={"/dokument"}>Dokument</Link>
      </div>
    </nav>
  );
};
