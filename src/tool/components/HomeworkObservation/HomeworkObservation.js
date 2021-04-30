import React, { useCallback, useEffect, useState } from "react";
import Split from "react-split";
import { Chart } from "react-google-charts";
import { TextEditor } from "./TextEditor";
import styles from "./HomeworkObservation.module.scss";

const defaultWidth = 521;
const defaultHeight = 400;

export const HomeworkObservation = ({ objective, observations, chartType, setObservations, minWordCount, chartData, chartOptions }) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    chartOptions.width = defaultWidth;
    chartOptions.height = defaultHeight;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSplitChange = useCallback((sizes) => {
    const contentWidth = document.querySelector(".student-dashboard").offsetWidth;
    const newWidth = parseInt(contentWidth * sizes[0] / 100) - 20;
    const newHeight = parseInt(newWidth * defaultHeight / defaultWidth);

    setWidth(newWidth);
    setHeight(newHeight);

    chartOptions.width = newWidth - 30;
    chartOptions.height = newHeight - 30;
  }, [chartOptions.height, chartOptions.width]);

  return (
    <div className={styles.homeworkAnswer}>
      <Split className={styles.split} sizes={[60, 40]} minSize={262} onDrag={handleSplitChange}>
        <div className={styles.spliPane}>
          <p>Take a look at your graph, displayed below.</p>
          <p><strong>Note</strong>: Your chart may look different depending on the size of your screen.</p>
          <div className={styles.chartPreview}>
            <Chart
              chartType={chartType}
              data={chartData}
              height={`${height}px`}
              options={chartOptions}
              width={`${width}px`}
            />
          </div>
        </div>
        <div className={styles.spliPane}>
          <div className={styles.info}>
            <p>
              {objective}
            </p>
            <p>
              Consider the objective above. Describe the chart design choices you made and how they supported your goal.
            </p>
          </div>
          <div className={styles.answer}>
            <TextEditor
              value={observations || ""}
              setValue={setObservations}
              minWordCount={minWordCount}
            />
          </div>
        </div>
      </Split>
    </div>
  );
}