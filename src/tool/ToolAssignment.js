import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AssignmentConfig } from "./components/AssignmentConfig/AssignmentConfig";
import { AssignmentObjective } from "./components/AssignmentObjective/AssignmentObjective";
import { DataSource } from "./components/DataSource/DataSource";

export const ToolAssignment = ({ isLimitedEditing, isUseAutoScore, toolAssignmentData, updateToolAssignmentData }) => {
  const [config, setConfig] = useState({})

  useEffect(() => {
    setConfig(toolAssignmentData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateConfig = useCallback((field, value) => {
    const newConfig = {
      ...config,
      [field]: value
    };

    setConfig(newConfig)
    updateToolAssignmentData(newConfig)
  }, [config, updateToolAssignmentData]);

  const handleUpdateTableData = useCallback((field, value) => {
    const newConfig = {
      ...config,
      [field]: value,
    };

    setConfig(newConfig)
    updateToolAssignmentData(newConfig)
  }, [config, updateToolAssignmentData]);

  const tableData = toolAssignmentData?.tableData ||  null;
  const tableData1 = toolAssignmentData?.tableData1 ||  null;
  const tableData2 = toolAssignmentData?.tableData2 ||  null;
  const tableData3 = toolAssignmentData?.tableData3 ||  null;
  const tableData4 = toolAssignmentData?.tableData4 ||  null;

  return (
    <Form>
      <AssignmentConfig
        config={config}
        onUpdate={handleUpdateConfig}
        isReadOnly={isLimitedEditing}
      />
      <AssignmentObjective
        objective={config.objective}
        onUpdate={handleUpdateConfig}
        isReadOnly={isLimitedEditing}
      />
      <DataSource
        isReadOnly={isLimitedEditing}
        onUpdate={handleUpdateTableData}
        tableData={tableData}
        tableData1={tableData1}
        tableData2={tableData2}
        tableData3={tableData3}
        tableData4={tableData4}
      />
    </Form>
  )
}