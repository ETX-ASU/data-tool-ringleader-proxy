import React, { useEffect, useRef, useState } from "react";
import classNames from "clsx";
import { Chart } from "react-google-charts";
import styles from "./HomeworkEditor.module.scss";

const headerHeight = 66;
const footerHeight = 60;
const modalPadding = 30;

export const HomeworkEditor = ({ data }) => {
  const [google, setGoogle] = useState(null);
  const [chartEditor, setChartEditor] = useState(null);
  const [chartWrapper, setChartWrapper] = useState(null);
  const [isChartVisible, setChartVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const isEditorAvailable = chartWrapper !== null && google !== null && chartEditor !== null;

    if (isEditorAvailable) {
      chartEditor.openDialog(chartWrapper)
      google.visualization.events.addListener(chartEditor, "ok", () => {
        const newChartWrapper = chartEditor.getChartWrapper()
        newChartWrapper.draw()
        setChartVisible(true);
        const newChartOptions = newChartWrapper.getOptions()
        const newChartType = newChartWrapper.getChartType()
        console.log('Chart type changed to ', newChartType)
        console.log('Chart options changed to ', newChartOptions)
      })
    }
  }, [chartEditor, chartWrapper, google]);

  useEffect(() => {
    const { left, top, width, height } = document.querySelector(".app").getBoundingClientRect();

    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = `
      .google-visualization-charteditor-dialog {
        left: ${left}px !important;
        top: ${top + headerHeight - modalPadding}px !important;
        width: ${width}px !important;
        height: ${height - headerHeight - footerHeight}px !important;
      }
    `;
    document.head.appendChild(style);
  }, [chartRef]);

  return (
    <div className={styles.homeworkEditor} ref={chartRef}>
      <Chart
        chartType="ScatterChart"
        className={classNames(styles.chart, isChartVisible && styles.visible)}
        data={data}
        height="500px"
        width="100%"
        getChartEditor={({ chartEditor, chartWrapper, google }) => {
          setGoogle(google);
          setChartEditor(chartEditor);
          setChartWrapper(chartWrapper);
        }}
        chartPackages={["corechart", "controls", "charteditor"]}
      />
    </div>
  )
}