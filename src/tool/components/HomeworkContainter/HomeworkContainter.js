import React from "react";
import { HomeworkFooter } from "../HomeworkFooter/HomeworkFooter";
import styles from "./HomeworkContainter.module.scss";

export const HomeworkContainter = ({ children, screen, setScreen }) => (
  <div className={styles.container}>
    <div className={styles.content}>
      {children}
    </div>
    <HomeworkFooter screen={screen} setScreen={setScreen} />
  </div>
)