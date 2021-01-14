import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AssignmentConfig } from "./components/AssignmentConfig/AssignmentConfig";

export const ToolAssignment = ({ isUseAutoScore, toolAssignmentData, updateToolAssignmentData }) => {
  const [config, setConfig] = useState({})

  useEffect(() => {
    setConfig(toolAssignmentData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateConfig = useCallback((field, value) => {
    setConfig((oldConfig) => {
      return {
        ...oldConfig,
        [field]: value
      }
    })
  }, [])

  return (
    <Form>
      <AssignmentConfig
        isUseAutoScore={isUseAutoScore}
        config={config}
        onUpdate={handleUpdateConfig}
      />
    </Form>
  )
}