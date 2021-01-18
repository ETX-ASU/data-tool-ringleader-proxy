import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";
import styles from "./HomeworkEditor.module.scss";

export const HomeworkEditor = ({ data }) => {
  const [google, setGoogle] = useState(null);
  const [chartEditor, setChartEditor] = useState(null);
  const [chartWrapper, setChartWrapper] = useState(null);

  const isEditorAvailable = chartWrapper !== null && google !== null && chartEditor !== null;

  return (
    <div className={styles.homeworkEditor}>
      <Button
        type="button"
        className="btn btn-primary"
        disabled={!isEditorAvailable}
        onClick={() => {
          chartEditor.openDialog(chartWrapper)
          google.visualization.events.addListener(chartEditor, 'ok', () => {
            const newChartWrapper = chartEditor.getChartWrapper()
            newChartWrapper.draw()
            const newChartOptions = newChartWrapper.getOptions()
            const newChartType = newChartWrapper.getChartType()
            console.log('Chart type changed to ', newChartType)
            console.log('Chart options changed to ', newChartOptions)
          })
        }}
      >
        Edit data
      </Button>
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="ScatterChart"
        data={data}
        getChartEditor={({ chartEditor, chartWrapper, google }) => {
          setGoogle(google);
          setChartEditor(chartEditor);
          setChartWrapper(chartWrapper)
        }}
        rootProps={{ 'data-testid': '1' }}
        chartPackages={['corechart', 'controls', 'charteditor']}
      />
    </div>
  )
}