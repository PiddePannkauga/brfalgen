import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";
import { createClient } from "contentful";
import { Header } from "../../components/header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const getStaticProps: GetStaticProps = async (context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID
      ? process.env.CONTENTFUL_SPACE_ID
      : "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
      ? process.env.CONTENTFUL_ACCESS_KEY
      : "",
  });
  const res = await client.getEntries({ content_type: "boendeInfo" });
  return { props: { info: res.items } };
};

const Info: NextPage = (props) => {
  console.log(props.info[0]);
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            {documentToReactComponents(props.info[0].fields.info)}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Brf Älgen info@brfalgen.se Osbygatan 1 214 43 Malmö Orgnr: 746001-0205
      </footer>
    </div>
  );
};

export default Info;
