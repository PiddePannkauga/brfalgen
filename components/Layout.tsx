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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <section style={{ marginTop: "18rem" }}>{children}</section>
      </main>

      <footer className={styles.footer}>
        Brf Älgen info@brfalgen.se Osbygatan 1 214 43 Malmö Orgnr: 746001-0205
      </footer>
    </div>
  );
};

export default Layout;
