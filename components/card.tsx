import type { NextComponentType } from "next";
import styles from "../styles/Home.module.css";
import cn from "classnames";

export const Card: NextComponentType = ({ children }: any) => {
  return (
    <div className={cn(styles.card, styles.moose)}>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
