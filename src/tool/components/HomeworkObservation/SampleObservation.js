import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./HomeworkObservation.module.scss";

export const SampleObservation = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = useCallback(() => setIsVisible(true), []);
  const handleHide = useCallback(() => setIsVisible(false), []);

  return (
    <>
      <div className={styles.sampleObservationButton} onClick={handleShow}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <Modal
        animation={false}
        centered
        className={styles.sampleObservationDialog}
        onHide={handleHide}
        show={isVisible}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sample observation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="sample-observation.png" alt="" className={styles.observationImage} />
          <p>
            The information in the data source represents the percentage of people who take different modes of transportation over various years. It shows that overtime, trains have remained around the same percentage, cars have increased significantly, the tube has remained around the same, and buses have decreased significantly. 
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}