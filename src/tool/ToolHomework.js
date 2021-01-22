import React, { useState, useEffect } from "react";
import { HomeworkIntro } from "./components/HomeworkIntro/HomeworkIntro";
import { HomeworkEditor } from "./components/HomeworkEditor/HomeworkEditor";
import { HomeworkObservation } from "./components/HomeworkObservation/HomeworkObservation";
import { HomeworkContainter } from "./components/HomeworkContainter/HomeworkContainter";
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

  const tableData = JSON.parse(toolAssignmentData.tableData);

  useEffect(() => {
    const wordCount = calculateWordCount(observations);
    const minWordCount = toolAssignmentData.minWordCount;
    const isValidHomework = wordCount >= minWordCount && Object.keys(chartOptions).length > 0;

    setSubmitEnabled(isValidHomework);
  }, [chartOptions, observations, setSubmitEnabled, toolAssignmentData.minWordCount]);

  if (isReadOnly) {
    return (
      <div>read only homework here</div>
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