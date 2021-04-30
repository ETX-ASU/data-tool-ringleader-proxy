import React, { useState, useEffect } from "react";
import { HomeworkIntro } from "./components/HomeworkIntro/HomeworkIntro";
import { HomeworkEditor } from "./components/HomeworkEditor/HomeworkEditor";
import { HomeworkObservation } from "./components/HomeworkObservation/HomeworkObservation";
import { HomeworkContainter } from "./components/HomeworkContainter/HomeworkContainter";
import { HomeworkPreview } from "./components/HomeworkPreview/HomeworkPreview";
import { calculateWordCount } from "./ToolUtils";
import { HOMEWORK_SCREEN } from "./constants";

export const ToolHomework = ({
  isReadOnly,
  toolAssignmentData,
  toolHomeworkData,
  updateToolHomeworkData,
  setSubmitEnabled
}) => {
  const [screen, setScreen] = useState(HOMEWORK_SCREEN.intro);
  const [chartType, setChartType] = useState("ScatterChart");
  const [chartOptions, setChartOptions] = useState({});
  const [observations, setObservations] = useState("");
  const [hasSavedWork, setHasSavedWork] = useState(
    toolHomeworkData.chartOptions !== "{}" || toolHomeworkData.observations.length !== 0
  )

  const tableData = JSON.parse(toolAssignmentData.tableData);
  tableData.cols = tableData.cols.map(({ pattern, ...col }) => {
    if (pattern === "General") {
      return col
    }

    return {
      ...col,
      pattern
    }
  })

  useEffect(() => {
    if (isReadOnly) {
      setChartType(toolHomeworkData.chartType);
    }
  }, [isReadOnly, toolHomeworkData.chartType]);

  if (chartType === "PieChart" && tableData.cols[0].type === "date") {
    tableData.cols[0].type = "string";
  }

  useEffect(() => {
    if (hasSavedWork) {
      setChartOptions(JSON.parse(toolHomeworkData.chartOptions));
      setChartType(toolHomeworkData.chartType);
      setObservations(toolHomeworkData.observations);
      setHasSavedWork(false);
    }
  }, [hasSavedWork, toolHomeworkData.chartOptions, toolHomeworkData.chartType, toolHomeworkData.observations]);

  useEffect(() => {
    if (!hasSavedWork && typeof updateToolHomeworkData === "function") {
      updateToolHomeworkData({
        chartType,
        chartOptions: JSON.stringify(chartOptions),
        observations
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSavedWork, chartOptions, observations]);

  useEffect(() => {
    const wordCount = calculateWordCount(observations);
    const minWordCount = toolAssignmentData.minWordCount;
    const isValidHomework = wordCount >= minWordCount && Object.keys(chartOptions).length > 0;

    typeof setSubmitEnabled === "function" && setSubmitEnabled(isValidHomework);
  }, [chartOptions, observations, setSubmitEnabled, toolAssignmentData.minWordCount]);

  if (isReadOnly) {
    return (
      <HomeworkPreview
        data={tableData}
        chartType={chartType}
        chartOptions={JSON.parse(toolHomeworkData.chartOptions)}
        observations={toolHomeworkData.observations}
      />
    )
  }

  return (
    <HomeworkContainter setScreen={setScreen} screen={screen}>
      {screen === HOMEWORK_SCREEN.intro && (
        <HomeworkIntro
          objective={toolAssignmentData.objective}
          data={tableData}
        />
      )}
      {screen === HOMEWORK_SCREEN.editor && (
        <HomeworkEditor
          data={tableData}
          chartType={chartType}
          chartOptions={chartOptions}
          setChartType={setChartType}
          setChartOptions={setChartOptions}
        />
      )}
      {screen === HOMEWORK_SCREEN.observation && (
        <HomeworkObservation
          objective={toolAssignmentData.objective}
          observations={observations}
          chartData={tableData}
          chartType={chartType}
          chartOptions={chartOptions}
          setObservations={setObservations}
          minWordCount={toolAssignmentData.minWordCount}
        />
      )}
    </HomeworkContainter>
  )
}