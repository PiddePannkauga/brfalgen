import type { NextComponentType } from "next";
import header from "../styles/Header.module.css";
import Link from "next/link";

export const Header: NextComponentType = (props) => {
  return (
    <div className={header.header}>
      <Link href={"/"}>
        <h1>Välkommen till BRF Älgen</h1>
      </Link>
      <div className={header.navbar}>
        <Link href={"/"}>Hem</Link>
        <Link href={"/about"}>Om Föreningen</Link>

        <Link href={"/boendeinfo"}>Boende info</Link>

        <Link href={"/contact"}>Kontakt</Link>

        <Link href={"/dokument"}>Dokument</Link>
      </div>
    </div>
  );
};
