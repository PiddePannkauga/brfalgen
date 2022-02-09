import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";
import { createClient } from "contentful";
import { Header } from "../../components/header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";

const renderOption = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      console.log(node);
      return (
        <a href={`https:${node.data.target.fields.file.url}`}>
          {node.data.target.fields.title}
        </a>
      );
    },
  },
};

export const getStaticProps: GetStaticProps = async (context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID
      ? process.env.CONTENTFUL_SPACE_ID
      : "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
      ? process.env.CONTENTFUL_ACCESS_KEY
      : "",
  });
  const res = await client.getEntries({ content_type: "dokument" });
  return { props: { dokument: res.items } };
};

const Dokument: NextPage = (props) => {
  console.log(props.dokument[0].fields, renderOption);
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            {documentToReactComponents(
              props.dokument[0].fields.dokument,
              renderOption
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Brf Älgen info@brfalgen.se Osbygatan 1 214 43 Malmö Orgnr: 746001-0205
      </footer>
    </div>
  );
};

export default Dokument;
