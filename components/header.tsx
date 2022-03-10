import type { NextComponentType } from "next";
import header from "../styles/Header.module.css";
import Link from "next/link";
import cn from "classnames";
import { useEffect, useState } from "react";

export const Header: NextComponentType = (props) => {
  const [isNavOpen, setisNavOpen] = useState(true);
  const [showMenuButton, setShowMenuButton] = useState(false);

  const handleNavbarOpen = () => {
    setisNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio < 1) {
          document.querySelector("nav")?.classList.add(`${header.sticky}`);
          setShowMenuButton(true);
          setisNavOpen(false);
        }
      },
      { threshold: 1 }
    );
    const navbar = document.querySelector(`.${header.navbar}`);
    if (navbar) {
      observer.observe(navbar);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY < 170) {
        setShowMenuButton(false);
        setisNavOpen(true);
        document.querySelector("nav")?.classList.remove(`${header.sticky}`);
      }
    });
    return () => {
      if (navbar) {
        observer.unobserve(navbar);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].intersectionRatio < 0.2) {
          setShowMenuButton(true);
          setisNavOpen(false);
          document.querySelector("nav")?.classList.add(`${header.sticky}`);
        }
      },
      { threshold: 0.2 }
    );
    const navbar = document.querySelector(`.${header.navbar}`);
    if (navbar) {
      observer.observe(navbar);
    }
  }, [isNavOpen]);

  return (
    <nav className={cn(header.header)}>
      {!showMenuButton && (
        <Link href={"/"}>
          <h1>Välkommen till BRF Älgen</h1>
        </Link>
      )}
      {showMenuButton ? (
        isNavOpen ? (
          <button
            className={header.closebutton}
            onClick={handleNavbarOpen}
          ></button>
        ) : (
          <button
            className={header.menubutton}
            onClick={handleNavbarOpen}
          ></button>
        )
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
