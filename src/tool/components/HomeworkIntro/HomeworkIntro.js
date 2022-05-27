import React, { useRef, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Col, Row } from "react-bootstrap";
import styles from "./HomeworkIntro.module.scss";

export const HomeworkIntro = ({ data, objective }) => {
  const introRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const height = introRef.current.parentNode.offsetHeight;
    dataTableRef.current.style.height = `${height - 54 - 41}px`;
  }, []);

  return (
    <div className={styles.homeworkIntro} ref={introRef}>
      <div className={styles.info}>
      The table below displays the data that you will use for this assignment. Your objective is to select a graph type and manipulate the chart considering the objective below. Take a moment to look over the data and any additional information, then when you are ready to proceed, click next.
      </div>
      <Row>
        <Col>
          <h3>Table</h3>
          <div className={styles.dataTable} ref={dataTableRef}>
            <Chart
              chartType="Table"
              data={data}
              options={{
                showRowNumber: true,
              }}
            />
          </div>
        </Col>
        <Col>
          <h3>Objective</h3>
          <div>
            {objective}
          </div>
        </Col>
      </Row>
    </div>
  );
}
