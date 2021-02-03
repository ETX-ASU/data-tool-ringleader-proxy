import React, { useCallback, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";
import { HomeworkDataTable } from "../HomeworkDataTable/HomeworkDataTable";
import { generateChartEditorStyles } from "./utils";
import styles from "./HomeworkEditor.module.scss";

export const HomeworkEditor = ({ data, chartType, chartOptions, setChartOptions, setChartType }) => {
  const [google, setGoogle] = useState(null);
  const [chartEditor, setChartEditor] = useState(null);
  const [chartWrapper, setChartWrapper] = useState(null);
  const [isChartVisible, setChartVisible] = useState(false);
  const [previousOptions, setPreviousOptions] = useState(chartOptions);
  const [previousType, setPreviousType] = useState(chartType);

  const handleOkClick = useCallback(() => {
    const newChartWrapper = chartEditor.getChartWrapper();

    newChartWrapper.draw();
    setChartVisible(true);

    let newChartOptions = newChartWrapper.getOptions();
    const newChartType = newChartWrapper.getChartType();

    delete newChartOptions.width;
    delete newChartOptions.height;

    setChartType(newChartType);
    setChartOptions({ ...newChartOptions });
  }, [chartEditor, setChartOptions, setChartType]);

  const handleCancelClick = useCallback(() => {
    setChartVisible(true);
    setChartOptions({ ...previousOptions });
    setChartType(previousType);
  }, [previousOptions, previousType, setChartOptions, setChartType]);

  const openEditor = useCallback(() => {
    if (chartEditor) {
      setChartVisible(false);
      setPreviousOptions({ ...chartOptions });
      setPreviousType(chartType);
      chartEditor.openDialog(chartWrapper);
    }
  }, [chartEditor, chartOptions, chartType, chartWrapper]);

  useEffect(() => {
    const isEditorAvailable = chartWrapper !== null && google !== null && chartEditor !== null;

    if (isEditorAvailable) {
      google.visualization.events.addListener(chartEditor, "ok", handleOkClick);
      google.visualization.events.addListener(chartEditor, "cancel", handleCancelClick);
    }
  }, [chartEditor, chartWrapper, google, handleCancelClick, handleOkClick]);

  useEffect(() => {
    const isEditorAvailable = chartWrapper !== null && google !== null && chartEditor !== null;

    if (isEditorAvailable && Object.keys(chartOptions).length === 0) {
      setPreviousOptions(chartOptions);
      setPreviousType(chartType);
      chartEditor.openDialog(chartWrapper)
    }
  }, [chartEditor, chartOptions, chartType, chartWrapper, google]);

  useEffect(() => {
    if (Object.keys(chartOptions).length > 0) {
      setChartVisible(true);
    }
  }, [chartOptions]);

  useEffect(() => {
    generateChartEditorStyles();
  }, []);

  return (
    <div className={styles.homeworkEditor}>
      <div className="chart-info">
        Use the controls below to select the graph and manipulate it in order to accurately represent the task.
        You may click on the table button at any point to view the data.
      </div>
      <div className={isChartVisible ? styles.chartVisible : styles.chartInvisible}>
        <div className={styles.buttons}>
          <HomeworkDataTable data={data} />
          <Button variant="outline-success" size="sm" onClick={openEditor} className={styles.editChartButton}>Edit chart</Button>
        </div>
        <Chart
          className={styles.chart}
          chartType={chartType}
          data={data}
          height="450px"
          width="910px"
          getChartEditor={({ chartEditor, chartWrapper, google }) => {
            setGoogle(google);
            setChartEditor(chartEditor);
            setChartWrapper(chartWrapper);
          }}
          options={{ ...chartOptions }}
          chartPackages={["corechart", "controls", "charteditor"]}
        />
      </div>
    </div>
  )
}