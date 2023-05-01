import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Header } from "../components/header";

const Layout: NextPage = ({ children }: any) => {
  return (
    <div lang="sv">
      <Head>
        <title>BRF Älgen</title>
        <meta name="description" content="BRF Älgen hemsida" />
        <link rel="icon" href="/algen.svg" />
      </Head>
      <Header />

      <main className={styles.main}>
        <section style={{ marginTop: "19rem" }}>{children}</section>
      </main>

      <footer className={styles.footer}>
        <p>Brf Älgen &nbsp;</p>
        <p>info@brfalgen.se &nbsp;</p>
        <p>Osbygatan&nbsp;1 214&nbsp;43 &nbsp;</p>
        <p>Malmö Orgnr: 746001-0205</p>
      </footer>
    </div>
  );
};

export default Layout;
