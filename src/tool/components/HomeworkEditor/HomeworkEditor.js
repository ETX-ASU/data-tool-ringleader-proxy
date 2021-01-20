import React, { useCallback, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";
import { generateChartEditorStyles } from "./utils";
import styles from "./HomeworkEditor.module.scss";

export const HomeworkEditor = ({ data }) => {
  const [google, setGoogle] = useState(null);
  const [chartEditor, setChartEditor] = useState(null);
  const [chartWrapper, setChartWrapper] = useState(null);
  const [isChartVisible, setChartVisible] = useState(false);
  const [chartHeight, setChartHeight] = useState(0);

  const handleOkClick = useCallback(() => {
    const newChartWrapper = chartEditor.getChartWrapper();

    newChartWrapper.draw();
    setChartVisible(true);

    const newChartOptions = newChartWrapper.getOptions();
    const newChartType = newChartWrapper.getChartType();

    console.log('Chart type changed to ', newChartType);
    console.log('Chart options changed to ', newChartOptions);
  }, [chartEditor]);

  const handleCancelClick = useCallback(() => {
    setChartVisible(true);
  }, []);

  const openEditor = useCallback(() => {
    if (chartEditor) {
      setChartVisible(false);
      chartEditor.openDialog(chartWrapper);
    }
  }, [chartEditor, chartWrapper]);

  useEffect(() => {
    const isEditorAvailable = chartWrapper !== null && google !== null && chartEditor !== null;

    if (isEditorAvailable) {
      chartEditor.openDialog(chartWrapper)
      google.visualization.events.addListener(chartEditor, "ok", handleOkClick);
      google.visualization.events.addListener(chartEditor, "cancel", handleCancelClick);
    }
  }, [chartEditor, chartWrapper, google, handleCancelClick, handleOkClick]);

  useEffect(() => {
    const { height } = generateChartEditorStyles();
    setChartHeight(height);
  }, []);

  return (
    <div className={styles.homeworkEditor}>
      <div className="chart-info">
        Use the controls below to select the graph and manipulate it in order to accurately represent. You may click on the table button at any point to view the data.
      </div>
      <div className={isChartVisible ? styles.chartVisible : styles.chartInvisible}>
        <Button variant="outline-success" size="sm">View data table</Button>
        <Button variant="outline-success" size="sm" onClick={openEditor}>Edit chart</Button>
        <Chart
          chartType="ScatterChart"
          data={data}
          height={`${chartHeight}px`}
          getChartEditor={({ chartEditor, chartWrapper, google }) => {
            setGoogle(google);
            setChartEditor(chartEditor);
            setChartWrapper(chartWrapper);
          }}
          chartPackages={["corechart", "controls", "charteditor"]}
        />
      </div>
    </div>
  )
}