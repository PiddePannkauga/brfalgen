import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { createClient } from "contentful";

import styles from "../styles/Home.module.css";

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
  fields: {
    title: string;
    id: string;
  };
};

const Home: NextPage = (props: any) => {
  return (
    <div className={styles.grid}>
      {props.posts.map((post: Post) => (
        <div key={post.fields.id} className={styles.card}>
          <h2>{post.fields.title}</h2>
          <p>Här ska det bli enkelt att visa nya saker</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
