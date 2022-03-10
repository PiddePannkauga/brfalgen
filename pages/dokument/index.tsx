import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import cn from "classnames";

const renderOption = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
      return (
        <a
          key={node.data.target.sys.id}
          href={`https:${node.data.target.fields.file.url}`}
        >
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

const Dokument: NextPage = (props: any) => {
  return (
    <div className={styles.grid}>
      <div className={cn(styles.card, styles.moose)}>
        <h2>Dokument</h2>
        <ul>
          {props.dokument.map((item: any) => (
            <li key={item.id}>
              {documentToReactComponents(item.fields.dokument, renderOption)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dokument;
