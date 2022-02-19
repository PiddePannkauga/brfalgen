import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Header } from "../components/header";

const Layout: NextPage = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>BRF Älgen</title>
        <meta name="description" content="BRF Älgen hemsida" />
        <link rel="icon" href="/favicon.ico" />
        <html lang="sv"></html>
      </Head>
      <Header />

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Brf Älgen info@brfalgen.se Osbygatan 1 214 43 Malmö Orgnr: 746001-0205
      </footer>
    </div>
  );
};

export default Layout;
