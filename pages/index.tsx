import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import styles from "../styles/Home.module.css";
import { Document } from "@contentful/rich-text-types";
import { Card } from "../components/card";

export const getStaticProps: GetStaticProps = async (context) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID
      ? process.env.CONTENTFUL_SPACE_ID
      : "",
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
      ? process.env.CONTENTFUL_ACCESS_KEY
      : "",
  });
  const res = await client.getEntries({ content_type: "post" });
  return { props: { posts: res.items } };
};

type Post = {
  sys: { updatedAt: string };
  fields: {
    title: string;
    id: string;
    body: Document;
  };
};

const Home: NextPage = (props: any) => {
  const parseDate = (ISOstring: string) => {
    const date = new Date(ISOstring);
    return date.toLocaleDateString("se");
  };
  return (
    <div className={styles.grid}>
      {props.posts.map((post: Post) => (
        <Card key={post.fields.id}>
          <h2>{post.fields.title}</h2>
          <p>{documentToReactComponents(post.fields.body)}</p>
          <div className={styles.createdAt}>
            {parseDate(post.sys.updatedAt)}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
