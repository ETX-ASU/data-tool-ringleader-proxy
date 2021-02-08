import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { HOMEWORK_SCREEN, SCREEN_ORDER } from "../../constants";
import styles from "./HomeworkFooter.module.scss";

export const HomeworkFooter = ({ screen, setScreen, canShowNavButtons }) => {
  const handlePrevPageClick = useCallback(() => {
    const screenIndex = SCREEN_ORDER.indexOf(screen)
    if (screenIndex > 0) {
      setScreen(SCREEN_ORDER[screenIndex - 1]);
    }
  }, [screen, setScreen]);

  const handleNextPageClick = useCallback(() => {
    const screenIndex = SCREEN_ORDER.indexOf(screen)
    if (screenIndex < SCREEN_ORDER.length - 1) {
      setScreen(SCREEN_ORDER[screenIndex + 1]);
    }
  }, [screen, setScreen]);

  if (!canShowNavButtons) {
    return null;
  }

  return (
    <div className={styles.footer}>
      <div>
        {screen !== HOMEWORK_SCREEN.intro && (
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrevPageClick}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Previous page</span>
          </Button>
        )}
      </div>
      <div>
        {screen !== HOMEWORK_SCREEN.observation && (
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={handleNextPageClick}
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        )}
      </div>
    </div>
  )
}