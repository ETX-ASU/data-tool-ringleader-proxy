import React from "react";
import {Modal, Button} from "react-bootstrap";
import styles from "./ConfirmationModal.module.scss";

function ConfirmationModal(props) {
  return(
    <Modal show={true} onHide={props.onHide} className={styles.confirmationModal}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        {props.buttons.map((b, i) =>
          <Button key={i} onClick={b.onClick}>{b.name}</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal;
