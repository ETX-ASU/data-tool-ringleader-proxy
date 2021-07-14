import React, { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Chart } from "react-google-charts";
import styles from "./HomeworkDataTable.module.scss";

export const HomeworkDataTable = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = useCallback(() => setIsVisible(true), []);
  const handleHide = useCallback(() => setIsVisible(false), []);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleShow}
      >
        View data table
      </Button>
      <Modal show={isVisible} onHide={handleHide} centered className={styles.tablePreviewDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Data table</Modal.Title>
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
