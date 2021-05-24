import React, { useEffect, useState } from "react"
import classNames from "clsx";
import { Chart } from "react-google-charts";
import { Col, Form, Row } from "react-bootstrap";
import { PreviewDataTable } from "./PreviewDataTable";
import { checkIfUrlIsValid } from "./utils";
import styles from "./DataSource.module.scss";

export const SingleDataSource = ({ isReadOnly, fieldName, onUpdate, initialData, title }) => {
  const [dataSourceUrl, setDataSourceUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (initialData !== null) {
      setData(initialData)
    }
  }, [initialData])

  useEffect(() => {
    const checkUrl = async (url) => {
      if (url === "") {
        setIsValidUrl(null)
        setData(null)
      } else {
        const isValid = await checkIfUrlIsValid(url)
        setIsValidUrl(isValid)

        if (!isValid) {
          setData(null)
        }
      }
    }

    checkUrl(dataSourceUrl)
  }, [dataSourceUrl])

  useEffect(() => {
    if (isValidUrl && data) {
      onUpdate(fieldName, data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isValidUrl])

  return (
    <div className={styles.singleDataSource}>
      {data && (
        <PreviewDataTable data={JSON.parse(data)} />
      )}
      {isValidUrl === false && (
        <div className={classNames(styles.errorMessage, "alert alert-danger")}>
          Could not find valid data table at given url.
        </div>
      )}
      <Row className="ml-2">
        <Form.Group as={Col}>
          <h4>{title}</h4>
          <Form.Label>Enter url to your Google Spreadsheet with the data source defined. Please make sure that anyone on the internet can view the spreadsheet!</Form.Label>
          <Form.Control
            className={classNames(
              isValidUrl === true && styles.validUrl,
              isValidUrl === false && styles.invalidUrl
            )}
            disabled={isReadOnly}
            type="text"
            value={dataSourceUrl}
            onChange={(event) => setDataSourceUrl(event.target.value)}
          />
        </Form.Group>
      </Row>
      {isValidUrl && (
        <div className={styles.chartLoader}>
          <Chart
            chartType="BarChart"
            spreadSheetUrl={dataSourceUrl}
            chartEvents={[
              {
                eventName: "error",
                callback: () => {
                  setData(null);
                  setIsValidUrl(false);
                }
              },
              {
                eventName: "ready",
                callback: ({ chartWrapper }) => {
                  const chartData = chartWrapper.getDataTable();
                  setData(chartData.toJSON());
                }
              }
            ]}
          />
        </div>
      )}
    </div>
  )
}