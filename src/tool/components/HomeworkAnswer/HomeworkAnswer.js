import React from "react";
// import { Chart } from "react-google-charts";
import { Col, Row } from "react-bootstrap";
import { TextEditor } from "./TextEditor";
import styles from "./HomeworkAnswer.module.scss";

export const HomeworkAnswer = ({ answer, setAnswer, minWordCount, chartData, chartOptions }) => {
  return (
    <div className={styles.homeworkAnswer}>
      <div className={styles.info}>
        Your objective was to manipulate the graphs in order to accurately represent the task.
        <br />
        Write a few sentences explaining why you designed your graph this way and the message it conveys.
      </div>
      <Row>
        <Col>
          <h3>Your chart</h3>
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
          <h3>Your answer</h3>
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