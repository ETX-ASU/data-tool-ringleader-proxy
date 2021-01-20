import React, { useCallback, useState } from "react";
import styles from "./HomeworkAnswer.module.scss";

export const TextEditor = ({ value, setValue, minWordCount }) => {
  const [wordCount, setWordCount] = useState(0)

  const handleChange = useCallback((event) => {
    const text = event.target.value;
    const wordCount = text.replace(/[^A-Za-z\s]/g, '').split(" ").filter(token => token).length;

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
      <p className={styles.wordCount}>
        Word #: {wordCount} / {minWordCount}
      </p>
    </>
  )
}