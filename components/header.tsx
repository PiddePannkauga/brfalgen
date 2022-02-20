import type { NextComponentType } from "next";
import header from "../styles/Header.module.css";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let currentScrolledPosition = window.scrollY || window.pageYOffset;
  let scrollingDown;

  if (currentScrolledPosition > previousScrollPosition) {
    scrollingDown = true;
  } else {
    scrollingDown = false;
  }
  previousScrollPosition = currentScrolledPosition;

  return scrollingDown;
};

let throttleWait = false;

const throttle = (callback: any, time: number) => {
  if (throttleWait) return;
  throttleWait = true;
  setTimeout(() => {
    callback();
    throttleWait = false;
  }, time);
};

export const Header: NextComponentType = (props) => {
  const [scrollingDown, setscrollingDown] = useState(false);

  if (typeof window !== "undefined") {
    const handleNavScroll = () => {
      setscrollingDown(isScrollingDown());
    };
    window.addEventListener("scroll", () => {
      throttle(handleNavScroll, 250);
    });
  }

  const scrollUpStyle = cn({
    [header.scrolldown]: scrollingDown,
    [header.scrollup]: !scrollingDown,
  });

  return (
    <nav className={cn(header.header, scrollUpStyle)}>
      <Link href={"/"}>
        <h1>Välkommen till BRF Älgen</h1>
      </Link>
      <div className={header.navbar}>
        <Link href={"/"}>Hem</Link>
        <Link href={"/about"}>Om Föreningen</Link>

        <Link href={"/boendeinfo"}>Boendeinfo</Link>

        <Link href={"/contact"}>Kontakt</Link>

        <Link href={"/dokument"}>Dokument</Link>
      </div>
    </nav>
  );
};
