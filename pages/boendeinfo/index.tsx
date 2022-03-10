import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";
import { createClient } from "contentful";
import { Header } from "../../components/header";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import cn from "classnames";

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

const Info: NextPage = (props: any) => {
  return (
    <div className={styles.grid}>
      <div className={cn(styles.card, styles.moose)}>
        {documentToReactComponents(props.info[0].fields.info)}
      </div>
    </div>
  );
};

export default Info;
