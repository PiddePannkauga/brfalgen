import type { NextComponentType } from "next";
import header from "../styles/Header.module.css";
import Link from "next/link";
import cn from "classnames";
import React, { useEffect, useState } from "react";

export const Header: NextComponentType = (props) => {
  const [isNavOpen, setisNavOpen] = useState(true);
  const [showMenuButton, setShowMenuButton] = useState(false);

  const handleNavbarOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setisNavOpen(!isNavOpen);
  };

  const handleStickyHeaderOnScroll = () => {
    const isDesktop = window.innerWidth;
    if (isDesktop > 920 && window.scrollY < 100) {
      setShowMenuButton(false);
      setisNavOpen(true);
      document.querySelector("nav")?.classList.remove(`${header.sticky}`);
    } else if (window.scrollY < 50) {
      setShowMenuButton(false);
      setisNavOpen(true);
      document.querySelector("nav")?.classList.remove(`${header.sticky}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio < 1) {
          setShowMenuButton(true);
          setisNavOpen(false);
          document.querySelector("nav")?.classList.add(`${header.sticky}`);
        }
      },
      { threshold: 0.3 }
    );
    const navbar = document.querySelector(`.${header.navbar}`);
    navbar && observer.observe(navbar);

    window.addEventListener("scroll", handleStickyHeaderOnScroll);

    return () => {
      navbar && observer.unobserve(navbar);
      window.removeEventListener("scroll", handleStickyHeaderOnScroll);
    };
  }, []);

  return (
    <nav className={cn(header.header)}>
      {!showMenuButton && (
        <Link href={"/"}>
          <h1>Välkommen till BRF Älgen</h1>
        </Link>
      )}
      {showMenuButton ? (
        <button
          className={isNavOpen ? header.closebutton : header.menubutton}
          onClick={(e) => handleNavbarOpen(e)}
        ></button>
      ) : null}

      <div
        className={header.navbar}
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
