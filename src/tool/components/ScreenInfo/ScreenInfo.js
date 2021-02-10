import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../../app/components/ConfirmationModal";
import styles from "./ScreenInfo.module.scss";

export const ScreenInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const zoom = (( window.outerWidth - 10 ) / window.innerWidth) * 100;
  const bodyRect = document.body.getBoundingClientRect();

  const handleOpen = useCallback(() => setIsVisible(true), []);
  const handleClose = useCallback(() => setIsVisible(false), []);

  return (
    <div className={styles.ScreenInfo}>
      <FontAwesomeIcon icon={faQuestionCircle} color="white" onClick={handleOpen} />
      {isVisible && (
        <ConfirmationModal onHide={handleClose} title="Debug info" buttons={[
          {name: 'Close', onClick: handleClose},
        ]}>
          <p>Document width: {Math.round(bodyRect.width)}</p>
          <p>Document height: {Math.round(bodyRect.height)}</p>
          <p>Zoom level: {Math.round(zoom)}</p>
        </ConfirmationModal>
      )}
    </div>
  )
}