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
  return assignment?.toolAssignmentData?.maxScore || MAX_SCORE;
}

export function getNewToolHomeworkDataForAssignment(assignment) {
  return Object.assign({}, EMPTY_HOMEWORK);
}

export function calcPercentCompleted(assignment, homework) {
  // TOOL-DEV: Create a method to calculate and return a percentage of the work a student completed on their homework)
  // This should be returned as a number between 0 and 100
  if (!homework?.id || !homework?.beganOnDate || !homework.toolHomeworkData.observations.length) {
    return 0;
  }

  return 100;
}

export function calcAutoScore(assignment, homework) {
  // TOOL-DEV: Given the assignment data and a student's current homework data, provide a method to return the grade a  student
  // should receive for their work. The should not go below 0, and should never exceed the value returned by calcMaxScoreForAssignment()
  if (!homework?.id || !homework?.beganOnDate || !homework.toolHomeworkData.observations.length) {
    return 0;
  }

  return calcMaxScoreForAssignment(assignment);
}

export const calculateWordCount = (text) => {
  return text
    .replace(/[^A-Za-z\s]/g, '').split(" ")
    .filter(token => token)
    .length;
}

export const getRandomDataSet = (assignmentData) => {
  const dataSets = [];
  const prefix = "tableData";

  Object.keys(assignmentData).forEach(key => {
    if (key.startsWith(prefix) && (assignmentData[key] || "").length > 0) {
      dataSets.push(key)
    }
  })

  const randomDataSet = dataSets[Math.floor(Math.random() * dataSets.length)];
  const dataSetNumber = randomDataSet.replace(prefix, "");

  if (dataSetNumber === "") {
    return 0;
  }

  return parseInt(dataSetNumber);
}