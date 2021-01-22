import {EMPTY_HOMEWORK, HOMEWORK_PROGRESS} from "../app/constants";
import { MAX_SCORE } from "./constants";

export function getHomeworkStatus(gradeData, homework) {
  const {gradingProgress} = gradeData;
  return (gradingProgress === HOMEWORK_PROGRESS.fullyGraded) ? HOMEWORK_PROGRESS.fullyGraded :
    (homework.submittedOnDate) ? HOMEWORK_PROGRESS.submitted :
      (homework.beganOnDate) ? HOMEWORK_PROGRESS.inProgress :
        HOMEWORK_PROGRESS.notBegun;
}

export function calcMaxScoreForAssignment(assignment) {
  // TOOL-DEV: Use your own code here to receive toolAssignmentData and use it to return the maximum possible score for this assignment
  return assignment?.toolAssignmentData?.maxScore || MAX_SCORE;
}

export function getNewToolHomeworkDataForAssignment(assignment) {
  // TOOL-DEV: Use your own code here to receive toolAssignmentData and use it create a new "blank" instance of the assignment
  // (This is the student's homework before the student has done any work on it.)
  return Object.assign({}, EMPTY_HOMEWORK);
}

export function calcPercentCompleted(assignment, homework) {
  // TOOL-DEV: Create a method to calculate and return a percentage of the work a student completed on their homework)
  // This should be returned as a number between 0 and 100
  if (!homework?.id || !homework?.beganOnDate) {
    return 0;
  }

  return 100; // GOGO-TODO
}

export function calcAutoScore(assignment, homework) {
  // TOOL-DEV: Given the assignment data and a student's current homework data, provide a method to return the grade a  student
  // should receive for their work. The should not go below 0, and should never exceed the value returned by calcMaxScoreForAssignment()
  if (!homework?.id || !homework?.beganOnDate) {
    return 0;
  }

  return 100; // GOGO-TODO
}

export const calculateWordCount = (text) => {
  return text
    .replace(/[^A-Za-z\s]/g, '').split(" ")
    .filter(token => token)
    .length;
}