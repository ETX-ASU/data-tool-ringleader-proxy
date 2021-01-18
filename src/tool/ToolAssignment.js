import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AssignmentConfig } from "./components/AssignmentConfig/AssignmentConfig";
import { AssignmentObjective } from "./components/AssignmentObjective/AssignmentObjective";
import { DataSource } from "./components/DataSource/DataSource";

export const ToolAssignment = ({ isUseAutoScore, toolAssignmentData, updateToolAssignmentData }) => {
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

  const tableData = toolAssignmentData?.tableData ||  null;

  return (
    <Form>
      <AssignmentConfig
        isUseAutoScore={isUseAutoScore}
        config={config}
        onUpdate={handleUpdateConfig}
      />
      <AssignmentObjective objective={config.objective} onUpdate={handleUpdateConfig} />
      <DataSource onUpdate={handleUpdateConfig} tableData={tableData} />
    </Form>
  )
}