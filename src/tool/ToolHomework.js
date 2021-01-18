import React, { useState } from "react";
import { HomeworkIntro } from "./components/HomeworkIntro/HomeworkIntro";
import { HomeworkEditor } from "./components/HomeworkEditor/HomeworkEditor";
import { HomeworkFooter } from "./components/HomeworkFooter/HomeworkFooter";
import { HOMEWORK_SCREEN } from "./constants";

export const ToolHomework = ({ isReadOnly, toolAssignmentData, toolHomeworkData, updateToolHomeworkData }) => {
  const [screen, setScreen] = useState(HOMEWORK_SCREEN.intro);
  const tableData = JSON.parse(toolAssignmentData.tableData);

  return (
    <>
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
      <HomeworkFooter screen={screen} setScreen={setScreen} />
    </>
  )
}