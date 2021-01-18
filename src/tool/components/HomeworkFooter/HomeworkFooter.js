import React, { useCallback } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { HOMEWORK_SCREEN } from "../../constants";
import styles from "./HomeworkFooter.module.scss";

export const HomeworkFooter = ({ screen, setScreen }) => {
  const handlePrevPageClick = useCallback(() => {
    if (screen === HOMEWORK_SCREEN.editor) {
      setScreen(HOMEWORK_SCREEN.intro);
    }
  }, [screen, setScreen]);

  const handleNextPageClick = useCallback(() => {
    if (screen === HOMEWORK_SCREEN.intro) {
      setScreen(HOMEWORK_SCREEN.editor);
    }
  }, [screen, setScreen]);

  return (
    <div className={styles.footer}>
      <Row>
        <Col>
          {screen !== HOMEWORK_SCREEN.intro && (
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrevPageClick}
            >Previous page</Button>
          )}
        </Col>
        <Col className="text-right">
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={handleNextPageClick}
          >Next</Button>
        </Col>
      </Row>
    </div>
  )
}