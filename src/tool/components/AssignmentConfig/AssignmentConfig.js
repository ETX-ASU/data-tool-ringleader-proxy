import React from "react";
import { Container, Col, Form, Row } from "react-bootstrap";
import { MAX_SCORE, MIN_WORD_COUNT } from "../../constants";

export const AssignmentConfig = ({ isUseAutoScore, isReadOnly, config, onUpdate }) => {
  return (
    <Container className="ml-2 mr-2">
      <h2 className="ml-2 mb-2">Assignment configuration</h2>
      <Row className="ml-2">
        <Form.Group as={Col}>
          <Form.Label>Required minimum word count in the answer</Form.Label>
          <Form.Control
            disabled={!isUseAutoScore || isReadOnly}
            type="number"
            value={config.minWordCount || ""}
            onChange={(event) =>
              onUpdate("minWordCount", event.target.value)
            }
            onBlur={(event) =>
              onUpdate("minWordCount", event.target.value || MIN_WORD_COUNT)
            }
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Maximum score for the assignment</Form.Label>
          <Form.Control
            disabled={!isUseAutoScore || isReadOnly}
            type="number"
            value={config.maxScore || ""}
            onChange={(event) =>
              onUpdate("maxScore", event.target.value)
            }
            onBlur={(event) =>
              onUpdate("maxScore", event.target.value || MAX_SCORE)
            }
          />
        </Form.Group>
      </Row>
    </Container>
  )
}