import React from "react";
import { Chart } from "react-google-charts";
import styles from "./HomeworkPreview.module.scss";

export const HomeworkPreview = ({ data, chartType, chartOptions, observations }) => (
  <div className={styles.wrapper}>
    <div className={styles.chartPreview}>
      <Chart
        chartType={chartType}
        data={data}
        options={{
          ...chartOptions,
          height: "500px",
          width: undefined
        }}
      />
    </div>
    <div className={styles.observations}>
      {observations}
    </div>
  </div>
)