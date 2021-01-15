import React from "react";
import { Container, Col, Form, Row } from "react-bootstrap";
import styles from "./AssignmentObjective.module.scss";

export const AssignmentObjective = ({ objective, onUpdate }) => {
  return (
    <Container className="ml-2 mr-2">
      <h2 className="ml-2 mb-2">Assignment objective</h2>
      <Row className="ml-2">
        <Form.Group as={Col}>
          <Form.Label>This text will be displayed to the students</Form.Label>
          <Form.Control
            as="textarea"
            className={styles.textarea}
            rows={3}
            value={objective || ""}
            onChange={(event) =>
              onUpdate("objective", event.target.value)
            }
          />
        </Form.Group>
      </Row>
    </Container>
  )
}