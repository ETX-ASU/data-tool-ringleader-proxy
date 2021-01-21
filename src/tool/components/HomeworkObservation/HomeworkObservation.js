import React from "react";
// import { Chart } from "react-google-charts";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { TextEditor } from "./TextEditor";
import styles from "./HomeworkObservation.module.scss";

export const HomeworkObservation = ({ answer, setAnswer, minWordCount, chartData, chartOptions }) => {
  return (
    <div className={styles.homeworkAnswer}>
      <Row>
        <Col>
          <h3>Take a look at your graph, displayed below.</h3>
          <div className={styles.chartPreview}>
            Chart will be here
            {/* <Chart
              chartType="Table"
              data={data}
              options={{
                showRowNumber: true,
              }}
            /> */}
          </div>
        </Col>
        <Col>
          <div className={styles.info}>
            <h3>Interpret Data Source</h3>
            Make a few observations about the information displayed in the data source that you have selected. 
            Make note of information like: the different
            <OverlayTrigger placement="auto"
              overlay={
                <Tooltip className={styles.customTooltip}>
                  <strong>Variable:</strong>
                  A variable is an element, factor, or any other category that you are trying to measure.
                </Tooltip>
              }
            >
              <span className={styles.withTooltip}>variables</span>
            </OverlayTrigger>
            that you see, any 
            <OverlayTrigger placement="auto"
              overlay={
                <Tooltip className={styles.customTooltip}>
                  <strong>Relationships between variables:</strong>
                  Relationships between variables explain how the data in one category affects or is affected by data in another. 
                </Tooltip>
              }
            >
              <span className={styles.withTooltip}>relationships between those variables</span>
            </OverlayTrigger>
            , and any other information the data source is relaying. 
          </div>
          <div className={styles.answer}>
            <TextEditor
              value={answer}
              setValue={setAnswer}
              minWordCount={minWordCount}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}