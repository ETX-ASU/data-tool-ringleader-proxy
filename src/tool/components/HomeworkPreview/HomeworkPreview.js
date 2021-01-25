import React from "react";
import { Chart } from "react-google-charts";
import { Col, Row } from "react-bootstrap";
import styles from "./HomeworkPreview.module.scss";

export const HomeworkPreview = ({ data, chartType, chartOptions, observations }) => (
  <div className={styles.wrapper}>
    <Row>
      <Col className="col-7">
        <div className={styles.chartPreview}>
          <Chart
            chartType={chartType}
            data={data}
            height="400px"
            options={chartOptions}
          />
        </div>
      </Col>
      <Col className="col-5">
        <div>
          {observations}
        </div>
      </Col>
    </Row>
  </div>
)