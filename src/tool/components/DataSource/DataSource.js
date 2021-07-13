import React, { useCallback } from "react";
import { Container } from "react-bootstrap";
import { SingleDataSource } from "./SingleDataSource";

export const DataSource = ({ isReadOnly, onUpdate, tableData, tableData1, tableData2, tableData3, tableData4 }) => {

  const handleUpdate = useCallback((fieldName, data) => {
    window.scrollTo(0,document.body.scrollHeight);
    onUpdate(fieldName, data)
  }, [onUpdate])

  return (
    <Container className="ml-2 mr-2">
      <h2 className="ml-2 mb-2">Data source urls</h2>
      <h4 className="ml-2 mb-2">You can add up to 5 data sets. Data sets will be randomly assigned to the students.
      <br />The next fields will be revealed when you fill in the visible fields.</h4>
      <SingleDataSource isReadOnly={isReadOnly} fieldName="tableData" onUpdate={handleUpdate} initialData={tableData} title="First data source" />
      {tableData !== null && (
        <SingleDataSource isReadOnly={isReadOnly} fieldName="tableData1" onUpdate={handleUpdate} initialData={tableData1} title="Second data source" />
      )}
      {tableData1 !== null && (
        <SingleDataSource isReadOnly={isReadOnly} fieldName="tableData2" onUpdate={handleUpdate} initialData={tableData2} title="Third data source" />
      )}
      {tableData2 !== null && (
        <SingleDataSource isReadOnly={isReadOnly} fieldName="tableData3" onUpdate={handleUpdate} initialData={tableData3} title="Fourth data source" />
      )}
      {tableData3 !== null && (
        <SingleDataSource isReadOnly={isReadOnly} fieldName="tableData4" onUpdate={handleUpdate} initialData={tableData4} title="Last data source" />
      )}
    </Container>
  )
}