import React, { useState } from "react";
import { HomeworkFooter } from "../HomeworkFooter/HomeworkFooter";
import styles from "./HomeworkContainter.module.scss";

export const HomeworkContainter = ({ children, screen, setScreen }) => {
  const [canShowNavButtons, setCanShowNavButtons] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child) ? React.cloneElement(child, { setCanShowNavButtons }) : child;
        })}
      </div>
      <HomeworkFooter screen={screen} setScreen={setScreen} canShowNavButtons={canShowNavButtons} />
    </div>
  );
}