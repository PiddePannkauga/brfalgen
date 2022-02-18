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
  const res = await client.getEntries({ content_type: "contact" });
  return { props: { contact: res.items } };
};

const Contact: NextPage = (props: any) => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        {documentToReactComponents(props.contact[0].fields.contact)}
      </div>
    </div>
  );
};

export default Contact;
