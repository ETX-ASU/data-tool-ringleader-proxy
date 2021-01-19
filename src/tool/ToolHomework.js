import React, { useState } from "react";
import { HomeworkIntro } from "./components/HomeworkIntro/HomeworkIntro";
import { HomeworkEditor } from "./components/HomeworkEditor/HomeworkEditor";
import { HomeworkContainter } from "./components/HomeworkContainter/HomeworkContainter";
import { HOMEWORK_SCREEN } from "./constants";

export const ToolHomework = ({ isReadOnly, toolAssignmentData, toolHomeworkData, updateToolHomeworkData }) => {
  const [screen, setScreen] = useState(HOMEWORK_SCREEN.editor);
  const tableData = JSON.parse(toolAssignmentData.tableData);

  return (
    <HomeworkContainter setScreen={setScreen} screen={screen}>
      {screen === HOMEWORK_SCREEN.intro && (
        <HomeworkIntro
          objective={toolAssignmentData.objective}
          data={tableData}
          setScreen={setScreen}
        />
      )}
      {screen === HOMEWORK_SCREEN.editor && (
        <HomeworkEditor
          data={tableData}
          setScreen={setScreen}
        />
      )}
    </HomeworkContainter>
  )
}