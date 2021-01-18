import React from "react";
import { HomeworkIntro } from "./components/HomeworkIntro/HomeworkIntro";

export const ToolHomework = ({ isReadOnly, toolAssignmentData, toolHomeworkData, updateToolHomeworkData }) => {
  const tableData = JSON.parse(toolAssignmentData.tableData);

  return (
    <div>
      <HomeworkIntro objective={toolAssignmentData.objective} data={tableData} />
    </div>
  )
}