/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAssignment = /* GraphQL */ `
  query GetAssignment($id: ID!) {
    getAssignment(id: $id) {
      id
      courseId
      ownerId
      title
      summary
      image
      isLinkedToLms
      lineItemId
      lockOnDate
      isLockedOnSubmission
      isUseAutoScore
      isUseAutoSubmit
      isArchived
      isFavorite
      toolAssignmentData {
        allowResubmission
        minWordCount
        maxScore
        objective
        tableData
        tableData1
        tableData2
        tableData3
        tableData4
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAssignments = /* GraphQL */ `
  query ListAssignments(
    $filter: ModelAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseId
        ownerId
        title
        summary
        image
        isLinkedToLms
        lineItemId
        lockOnDate
        isLockedOnSubmission
        isUseAutoScore
        isUseAutoSubmit
        isArchived
        isFavorite
        toolAssignmentData {
          allowResubmission
          minWordCount
          maxScore
          objective
          tableData
          tableData1
          tableData2
          tableData3
          tableData4
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHomework = /* GraphQL */ `
  query GetHomework($id: ID!) {
    getHomework(id: $id) {
      id
      assignmentId
      studentOwnerId
      beganOnDate
      submittedOnDate
      isLocked
      toolHomeworkData {
        chartType
        chartOptions
        observations
        dataSet
      }
      createdAt
      updatedAt
    }
  }
`;
export const listHomeworks = /* GraphQL */ `
  query ListHomeworks(
    $filter: ModelHomeworkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomeworks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        assignmentId
        studentOwnerId
        beganOnDate
        submittedOnDate
        isLocked
        toolHomeworkData {
          chartType
          chartOptions
          observations
          dataSet
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const homeworkByStudentAndAssignment = /* GraphQL */ `
  query HomeworkByStudentAndAssignment(
    $assignmentId: ID
    $studentOwnerId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHomeworkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    homeworkByStudentAndAssignment(
      assignmentId: $assignmentId
      studentOwnerId: $studentOwnerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        assignmentId
        studentOwnerId
        beganOnDate
        submittedOnDate
        isLocked
        toolHomeworkData {
          chartType
          chartOptions
          observations
          dataSet
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
