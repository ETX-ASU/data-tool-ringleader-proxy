import React, { useCallback, useState } from "react";
import classNames from "clsx";
import { Modal } from "react-bootstrap";
import { Chart } from "react-google-charts";
import styles from "./PreviewDataTable.module.scss";

export const PreviewDataTable = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = useCallback(() => setIsVisible(true), []);
  const handleHide = useCallback(() => setIsVisible(false), []);

  return (
    <>
      <div className={classNames(styles.dataTablePreview, "alert alert-success")}>
        Data loaded successfully.
        <span onClick={handleShow}>Click here to preview data table</span>
        <br />
        You can change your data source URL until a student begins.
      </div>
      <Modal show={isVisible} onHide={handleHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Data table preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.wrapper}>
            <Chart
              chartType="Table"
              data={data}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
