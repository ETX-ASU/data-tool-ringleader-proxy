import React, {Fragment, useCallback, useState} from 'react';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {ACTIVITY_PROGRESS, HOMEWORK_PROGRESS, MODAL_TYPES, UI_SCREEN_MODES} from "../../app/constants";
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {updateHomework as updateHomeworkMutation} from "../../graphql/mutations";
import {API} from "aws-amplify";
import {setActiveUiScreenMode} from "../../app/store/appReducer";
import HeaderBar from "../../app/components/HeaderBar";
import {reportError} from "../../developer/DevUtils";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import ConfirmationModal from "../../app/components/ConfirmationModal";
import { ToolHomework } from "../../tool/ToolHomework";
import {sendAutoGradeToLMS} from "../../lmsConnection/RingLeader";
import {calcAutoScore, calcMaxScoreForAssignment} from "../../tool/ToolUtils";
import { FullscreenOverlay } from '../../tool/components/FullscreenOverlay/FullscreenOverlay';
import styles from "./HomeworkEngager.module.scss";

library.add(faCheck, faTimes);



/** This screen is shown to the student so they can "engage" with the homework assignment.
 * Any work they do or changes or interactions they make would be recorded and the updates
 * saved to the database as necessary. */
function HomeworkEngager(props) {
  const dispatch = useDispatch();
	const {homework, assignment} = props;
	const activeUser = useSelector(state => state.app.activeUser);
  const [toolHomeworkData, setToolHomeworkData] = useState(Object.assign({}, homework.toolHomeworkData));
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveButtonClick = async () => {
    setIsSubmitting(true);

    try {
      const inputData = Object.assign({}, homework, {
        toolHomeworkData
      });

      delete inputData.createdAt;
      delete inputData.updatedAt;
      delete inputData.activityProgress;
      delete inputData.homeworkStatus;
      delete inputData.gradingProgress;
      delete inputData.scoreGiven;
      delete inputData.scoreMaximum;
      delete inputData.comment;

      const result = await API.graphql({query: updateHomeworkMutation, variables: {input: inputData}});
      setIsSubmitting(false);
      if (result) {
        if (assignment.isUseAutoSubmit) await calcAndSendScore(inputData);
        await setActiveModal({type: MODAL_TYPES.confirmHomeworkSaved})
      } else {
        reportError('', `We're sorry. There was a problem saving your homework. Please wait a moment and try again.`);
      }
    } catch (error) {
      reportError(error, `We're sorry. There was a problem saving your homework. Please wait a moment and try again.`);
    }
  };

  async function submitHomeworkForReview() {
    setActiveModal(null);
    setIsSubmitting(true);

    try {
      const inputData = Object.assign({}, homework, {
        toolHomeworkData,
        beganOnDate: (homework.beganOnDate) ? homework.beganOnDate : moment().valueOf(),
        submittedOnDate: (homework.submittedOnDate) ? homework.submittedOnDate : moment().valueOf()
      });
      delete inputData.createdAt;
      delete inputData.updatedAt;
      delete inputData.activityProgress;
      delete inputData.homeworkStatus;
      delete inputData.gradingProgress;
      delete inputData.scoreGiven;
      delete inputData.scoreMaximum;
      delete inputData.comment;

      const result = await API.graphql({query: updateHomeworkMutation, variables: {input: inputData}});
      setIsSubmitting(false);

      if (result) {
        if (assignment.isUseAutoSubmit) await calcAndSendScore(inputData);
        await setActiveModal({type: MODAL_TYPES.confirmHomeworkSubmitted})
      } else {
        reportError('', `We're sorry. There was a problem submitting your homework for review. Please wait a moment and try again.`);
      }
    } catch (error) {
      reportError(error, `We're sorry. There was a problem submitting your homework for review. Please wait a moment and try again.`);
    }
  }

  async function calcAndSendScore(homework) {
    try {
      const scoreDataObj = {
        assignmentId: assignment.id,
        studentId: activeUser.id,
        scoreGiven: await calcAutoScore(assignment, homework),
        scoreMaximum: await calcMaxScoreForAssignment(assignment),
        comment: '',
        activityProgress: ACTIVITY_PROGRESS.Completed,
        gradingProgress: HOMEWORK_PROGRESS.fullyGraded
      };

      console.warn('-----> about to send scoreDataObj: ', scoreDataObj);
      await sendAutoGradeToLMS(scoreDataObj);
    } catch(error) {
      reportError(error, `We're sorry. There was a problem posting your grade`);
    }
  }

  async function closeSaveModal() {
    setActiveModal(null);
  }

  async function closeModalAndReview() {
    setIsSubmitting(true);
    setActiveModal(null);
    await props.refreshHandler();
    dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.reviewHomework));
  }

  function handleHomeworkDataChange(data) {
    setToolHomeworkData(data);
  }

  function autoSave() {
    // TODO: Bonus. Add in method to handle automatically saving student work
  }

  function renderModal() {
    switch (activeModal.type) {
      case MODAL_TYPES.warningBeforeHomeworkSubmission:
        return (
          <ConfirmationModal
            onHide={() => setActiveModal(null)}
            title={'Are you sure?'}
            isStatic
            buttons={[
              { name: 'Cancel', variant: 'secondary', onClick: () => setActiveModal(null) },
              { name: 'Submit', onClick: submitHomeworkForReview },
            ]}
          >
            <p>
              {assignment.toolAssignmentData.allowResubmission
                ? 'Your assignment will be marked as submitted, but you will be able to make additional edits.'
                : 'Once submitted, you cannot go back to make additional edits to your assignment.'}
            </p>
          </ConfirmationModal>
        )

      case MODAL_TYPES.confirmHomeworkSubmitted:
        return (
          <ConfirmationModal onHide={() => setActiveModal(null)} title={'Submitted!'} isStatic buttons={[
            {name:'Review', onClick:closeModalAndReview},
          ]}>
            <p>You can now review your submitted assignment.</p>
          </ConfirmationModal>
        )

      case MODAL_TYPES.confirmHomeworkSaved:
        return (
          <ConfirmationModal isStatic title={'Saved!'} buttons={[
            {name:'OK', onClick:closeSaveModal},
          ]}>
            <p>You homework is saved. You can continue editing or close this window and come back later.</p>
          </ConfirmationModal>
          )
      default:
        return null;
    }
  }

  const handleSubmitButtonClick = useCallback(() => {
    setActiveModal({type:MODAL_TYPES.warningBeforeHomeworkSubmission})
  }, [])

  return (
    <Fragment>
      {activeModal && renderModal()}
      <HeaderBar title={assignment.title} smallTitle>
        {!homework.submittedOnDate && (
          <>
            <Button onClick={handleSaveButtonClick}>Save</Button>
            &nbsp;
          </>
        )}
        {isSubmitEnabled ? (
          <Button onClick={handleSubmitButtonClick}>
            {homework.submittedOnDate ? 'Resubmit' : 'Submit'}
          </Button>
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="submit-button-tooltip">
                You can't submit your work until you enter required number of words in the text area on the last page.
              </Tooltip>
            }
          >
            <Button className={styles.disabledButton} type="button">Submit</Button>
          </OverlayTrigger>
        )}
      </HeaderBar>

      {isSubmitting && <FullscreenOverlay />}

      <ToolHomework
        isReadOnly={false}
        isShowCorrect={false}
        toolAssignmentData={assignment.toolAssignmentData}
        toolHomeworkData={toolHomeworkData}
        updateToolHomeworkData={handleHomeworkDataChange}
        triggerAutoSave={autoSave}
        setSubmitEnabled={setSubmitEnabled}
      />
    </Fragment>
	)
}

export default HomeworkEngager;