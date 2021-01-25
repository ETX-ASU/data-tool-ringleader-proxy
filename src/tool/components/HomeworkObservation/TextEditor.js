import React, { useCallback, useState } from "react";
import { calculateWordCount } from "../../ToolUtils";
import styles from "./HomeworkObservation.module.scss";

export const TextEditor = ({ value, setValue, minWordCount }) => {
  const [wordCount, setWordCount] = useState(0)

  const handleChange = useCallback((event) => {
    const text = event.target.value;
    const wordCount = calculateWordCount(text);

    setValue(text);
    setWordCount(wordCount);
  }, [setValue]);

  return (
    <>
      <textarea
        className="form-control"
        rows={10}
        value={value}
        onChange={handleChange}
      />
      <div></div>
      <p className={styles.wordCount}>
        <span>Words: {wordCount}</span>
        <span>Required words: {minWordCount}</span>
      </p>
    </>
  )
}