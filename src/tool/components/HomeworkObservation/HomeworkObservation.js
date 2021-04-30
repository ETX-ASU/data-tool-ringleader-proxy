import React from "react";
import { Chart } from "react-google-charts";
import { Col, Row } from "react-bootstrap";
import { TextEditor } from "./TextEditor";
import styles from "./HomeworkObservation.module.scss";

export const HomeworkObservation = ({ objective, observations, chartType, setObservations, minWordCount, chartData, chartOptions }) => {
  return (
    <div className={styles.homeworkAnswer}>
      <Row>
        <Col className="col-7">
          <p>Take a look at your graph, displayed below.</p>
          <p><strong>Note</strong>: Your chart may look different depending on the size of your screen.</p>
          <div className={styles.chartPreview}>
            <Chart
              chartType={chartType}
              data={chartData}
              height="400px"
              options={chartOptions}
            />
          </div>
        </Col>
        <Col className="col-5">
          <div className={styles.info}>
            <p>
              {objective}
            </p>
            <p>
              Consider the objective above. Describe the chart design choices you made and how they supported your goal.
            </p>
          </div>
          <div className={styles.answer}>
            <TextEditor
              value={observations || ""}
              setValue={setObservations}
              minWordCount={minWordCount}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}