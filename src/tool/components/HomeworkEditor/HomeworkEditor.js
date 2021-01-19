import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./HomeworkEditor.module.scss";

export const HomeworkEditor = ({ data }) => {
  const [google, setGoogle] = useState(null);
  const [chartEditor, setChartEditor] = useState(null);
  const [chartWrapper, setChartWrapper] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const isEditorAvailable = chartWrapper !== null && google !== null && chartEditor !== null;

    if (isEditorAvailable) {
      chartEditor.openDialog(chartWrapper)
      google.visualization.events.addListener(chartEditor, "ok", () => {
        const newChartWrapper = chartEditor.getChartWrapper()
        newChartWrapper.draw()
        const newChartOptions = newChartWrapper.getOptions()
        const newChartType = newChartWrapper.getChartType()
        console.log('Chart type changed to ', newChartType)
        console.log('Chart options changed to ', newChartOptions)
      })
    }
  }, [chartEditor, chartWrapper, google]);

  useEffect(() => {
    const { left, top, width, height } = chartRef.current.getBoundingClientRect();

    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = `
      .google-visualization-charteditor-dialog {
        left: ${left}px !important;
        top: ${top}px !important;
        width: ${width}px !important;
        height: ${height}px !important;
      }
    `;
    document.head.appendChild(style);
  }, [chartRef]);

  return (
    <div className={styles.homeworkEditor} ref={chartRef}>
      <Chart
        chartType="ScatterChart"
        data={data}
        height="590px"
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