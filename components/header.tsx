import type { NextFunctionComponent } from "next";
import header from "../styles/Header.module.css";
import Link from "next/link";

export const Header: NextFunctionComponent = (props) => {
  return (
    <div className={header.header}>
      <h1>Välkommen till BRF Älgen</h1>
      <ul>
        <li>
          <Link href={"/about"}>Om Föreningen</Link>
        </li>
        <li>
          <Link href={"/boendeinfo"}>Boende info</Link>
        </li>
        <li>
          <Link href={"/contact"}>Kontakt</Link>
        </li>
        <li>
          <Link href={"/dokument"}>Dokument</Link>
        </li>
      </ul>
    </div>
  );
};
