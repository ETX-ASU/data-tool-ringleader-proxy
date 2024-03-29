import React, {Fragment, useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuid } from "uuid";
import classNames from "classnames"

import {createAssignment, updateAssignment} from '../../graphql/mutations';
import {UI_SCREEN_MODES, MODAL_TYPES} from "../../app/constants";
import {editDupedAssignment, setActiveUiScreenMode} from "../../app/store/appReducer";
import "./assignments.scss";

import {Container, Row, Button, Col} from "react-bootstrap";
import {getAssignment, listAssignments} from "../../graphql/queries";
import LoadingIndicator from "../../app/components/LoadingIndicator";
import HeaderBar from "../../app/components/HeaderBar";
import ConfirmationModal from "../../app/components/ConfirmationModal";
import { Select } from "../../app/components/Select";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import { faPlus, faCopy } from '@fortawesome/free-solid-svg-icons'
import {reportError} from "../../developer/DevUtils";

import styles from "./AssignmentNewOrDupe.module.scss";

library.add(faCopy, faPlus);

/**
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * @param {{title: string; formattedDate: string; lineItemId?: string}} assignment
 * @param {boolean} isActive
 * @returns {React.Element}
 */
const assignmentItemRenderer = ({ title, formattedDate, lineItemId }, isActive) => {
  return (
    <div className={classNames(styles.item, isActive && styles.active)}>
      <div className={styles.title}>
        {lineItemId && <span className={styles.asterisk}>*</span>}
        {title}
      </div>
      <div className={styles.date}>{formattedDate || '-'}</div>
    </div>
  );
};

/**
 *
 * @param {string} searchQuery
 * @returns {(assignment: {title: string; formattedDate: string}) => boolean}
 */
const assignmentFilterStrategy = (searchQuery) => {
  const normalizedSearchQuery = searchQuery.toLowerCase();

  return ({ title, formattedDate }) =>
    title.toLowerCase().includes(normalizedSearchQuery) || formattedDate.toLowerCase().includes(normalizedSearchQuery);
};

/**
 *
 * @param {{title: string}} assignment
 * @returns {string}
 */
const assignmentToQuery = ({ title }) => title;

function AssignmentNewOrDupe() {
	const dispatch = useDispatch();
	const activeUser = useSelector(state => state.app.activeUser);
  const courseId = useSelector(state => state.app.courseId);

  const [assignments, setAssignments] = useState([]);
  const [strandedAssignments, setStrandedAssignments] = useState([]);
  const [isFetchingAssignments, setIsFetchingAssignments] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    fetchAssignmentList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function fetchAssignmentList() {
    setIsFetchingAssignments(true);

    try {
      let nextTokenVal = null;
      let allAssignments = [];

      do {
        const assignmentQueryResults = await API.graphql(graphqlOperation(listAssignments,
          {filter:{ownerId:{eq:activeUser.id}},
            nextToken: nextTokenVal
          }));
        nextTokenVal = assignmentQueryResults.data.listAssignments.nextToken;
        allAssignments.push(...assignmentQueryResults.data.listAssignments.items
          .map((item) => ({
            ...item,
            timestamp: new Date(item.createdAt).getTime(),
            formattedDate: item.createdAt ? formatDate(new Date(item.createdAt)) : null,
          }))
          .sort((a, b) => b.timestamp - a.timestamp),
        );
      } while (nextTokenVal);

      // if (window.isDevMode) console.log("------> assignmentIds: ", allAssignments.map(a => a.id));
      setAssignments(allAssignments);
      const stranded = allAssignments.filter(a => a.lineItemId === '');
      setStrandedAssignments(stranded);
      setIsFetchingAssignments(false);
    } catch (error) {
      reportError(error, `We're sorry. There was an error while attempting to fetch the list of your existing assignments for duplication.`);
    }
  }

  function closeModalAndEditDuped(dupedAssignmentData) {
    setActiveModal(null);
    dispatch(editDupedAssignment(dupedAssignmentData));
  }

  async function handleAssignmentSelected(assignment) {
    if (assignment) {
      const assignmentQueryResults = await API.graphql(graphqlOperation(getAssignment, { id: assignment.id }));
      setSelectedAssignment(assignmentQueryResults.data.getAssignment);
      return;
    }

    setSelectedAssignment(null);
  }

  async function handleDupeAssignment(e) {
    try {
      const inputData = Object.assign({}, selectedAssignment, {
        title: (!selectedAssignment.lineItemId) ? selectedAssignment.title : `Copy of ${selectedAssignment.title}`,
        lineItemId:'',
        isLinkedToLms: false,
        id: (!selectedAssignment.lineItemId) ? selectedAssignment.id : uuid(),
        ownerId: activeUser.id,
        courseId,
        lockOnDate: 0
      });
      delete inputData.createdAt;
      delete inputData.updatedAt;

      let result;
      if (selectedAssignment.lineItemId) {
        result = await API.graphql({query: createAssignment, variables: {input: inputData}})
        setActiveModal({type:MODAL_TYPES.confirmAssignmentDuped, data:[selectedAssignment.title, result.data.createAssignment]});
      } else {
        result = await API.graphql({query: updateAssignment, variables: {input: inputData}});
        setActiveModal({type:MODAL_TYPES.confirmAssignmentRecovered, data:[selectedAssignment.title, result.data.updateAssignment]});
      }

    } catch (error) {
      reportError(error, `We're sorry. There was a problem duplicating and saving your new assignment.`);
    }
  }

  function handleCreateAssignment(e) {
    dispatch(setActiveUiScreenMode(UI_SCREEN_MODES.createAssignment));
  }

  function renderModal() {
    switch (activeModal.type) {
      case MODAL_TYPES.confirmAssignmentDuped:
        return (
          <ConfirmationModal onHide={() => setActiveModal(null)} title={'Assignment Saved'}
            buttons={[{ name: 'Edit Duplicated Assignment', onClick: () => closeModalAndEditDuped(activeModal.data[1]) }]}>
            { (activeModal.data[0].lineItemId)
              ? <p>A new assignment called Copy of {activeModal.data[0]} has been saved! It is now accessible in your LMS.</p>
              : <p>You will now be taken to a screen so you can edit and customize your newly duplicated assignment.</p>
            }
          </ConfirmationModal>
        );
      case MODAL_TYPES.confirmAssignmentRecovered:
        return (
          <ConfirmationModal onHide={() => setActiveModal(null)} title={'Assignment Saved'}
            buttons={[{ name: 'Edit Recovered Assignment', onClick: () => closeModalAndEditDuped(activeModal.data[1]) }]}>
            <p>Your assignment "{activeModal.data[0]}" has been recovered. You will now be taken to a screen so you can edit and customize this recovered assignment.</p>
          </ConfirmationModal>
        );
      default:
        return null;
    }
  }

	return (
		<Fragment>
      {activeModal && renderModal()}
      <HeaderBar withLogo title='Create New Assignment' canCancel={false} canSave={false} />

      <Container className="m-2" style={{ position: "relative" }}>
        {isFetchingAssignments &&
          <Row>
            <LoadingIndicator className='p-4 text-center h-100 align-middle' isDarkSpinner={true} loadingMsg={'FETCHING DATA'} size={3} />
          </Row>
        }

        {!isFetchingAssignments &&
        <Fragment>
          <Row className={styles.row}>
            <Col>Create a new assignment by selecting one of the following options:</Col>
          </Row>
          <Row className={styles.optionRow}>
            <Col className={styles.column}>
              <div>
                <h3 className={'mt-3 mb-2'}>Start a new assignment</h3>
                <p>Staring a new assignment will provide you with a blank template to build from.</p>
              </div>
            </Col>

            <div className={styles.separator}>
              <span>OR</span>
            </div>

            <Col className={styles.column}>
              <div>
                <h3 className={'mt-3 mb-2'}>Duplicate an assignment</h3>
                <p>Choose an existing assignment, duplicate it, then customize it.</p>
                <div className="form-group">
                  {assignments.length && (
                    <Select
                      placeholder="Select an assignment"
                      items={assignments}
                      onChange={handleAssignmentSelected}
                      itemRenderer={assignmentItemRenderer}
                      filterStrategy={assignmentFilterStrategy}
                      itemToQuery={assignmentToQuery}
                    />
                  )}
                  {!assignments.length &&
                    <h4>*You must have at least 1 existing assignment before you can duplicate anything.</h4>
                  }
                </div>
                {!!strandedAssignments.length && <p>*Marked assignments were not properly created in the LMS, but can be recovered by selecting it here.</p>}
              </div>
            </Col>
          </Row>

          <Row className={styles.actionsRow}>
            <Col className={styles.column}>
              <div className={styles.actions}>
                <Button className="align-middle" onClick={handleCreateAssignment}>
                  <FontAwesomeIcon className='btn-icon' icon={faPlus} />
                  New Assignment
                </Button>
              </div>
            </Col>
            <div className={styles.separator}></div>
            <Col className={styles.column}>
              <div className={styles.actions}>
                <Button className='align-middle' onClick={handleDupeAssignment} disabled={!selectedAssignment}>
                  <FontAwesomeIcon className='btn-icon' icon={faCopy} />
                  {(!assignments.length || selectedAssignment?.lineItemId) ? 'Duplicate' : 'Recover'}
                </Button>
              </div>
            </Col>
          </Row>

        </Fragment>
        }
      </Container>
      {/* {!isFetchingAssignments && assignments.length > 0 && <AssignmentsList list={assignments} />} */}
    </Fragment>
  )
}

export default AssignmentNewOrDupe;