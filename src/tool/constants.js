export const MIN_WORD_COUNT = 50;
export const MAX_SCORE = 100;

export const EMPTY_TOOL_ASSIGNMENT_DATA = {
  minWordCount: MIN_WORD_COUNT,
  maxScore: MAX_SCORE,
  objective: "",
  tableData: ""
}

export const EMPTY_TOOL_HOMEWORK_DATA = {
  chartOptions: "{}",
  observations: ""
}

export const GOOGLE_SPREADSHEET_REGEX = /https:\/\/docs\.google\.com\/spreadsheets/

export const HOMEWORK_SCREEN = {
  intro: "intro",
  editor: "editor",
  observation: "observation"
}

export const SCREEN_ORDER = [HOMEWORK_SCREEN.intro, HOMEWORK_SCREEN.editor, HOMEWORK_SCREEN.observation];
