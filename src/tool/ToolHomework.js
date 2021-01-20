import React, { useState } from "react";
import { HomeworkIntro } from "./components/HomeworkIntro/HomeworkIntro";
import { HomeworkEditor } from "./components/HomeworkEditor/HomeworkEditor";
import { HomeworkAnswer } from "./components/HomeworkAnswer/HomeworkAnswer";
import { HomeworkContainter } from "./components/HomeworkContainter/HomeworkContainter";
import { HOMEWORK_SCREEN } from "./constants";

export const ToolHomework = ({ isReadOnly, toolAssignmentData, toolHomeworkData, updateToolHomeworkData }) => {
  const [screen, setScreen] = useState(HOMEWORK_SCREEN.answer);
  const [answer, setAnswer] = useState("");

  const tableData = JSON.parse(toolAssignmentData.tableData);

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
        />
      )}
      {screen === HOMEWORK_SCREEN.answer && (
        <HomeworkAnswer
          answer={answer}
          setAnswer={setAnswer}
          minWordCount={toolAssignmentData.minWordCount}
        />
      )}
    </HomeworkContainter>
  )
}