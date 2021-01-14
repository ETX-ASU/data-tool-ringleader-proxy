import React, { useEffect, useState } from "react";
import classNames from "clsx";
import { Chart } from "react-google-charts";
import { Container, Col, Form, Row } from "react-bootstrap";
import { checkIfUrlIsValid, parseChartData } from "./utils";
import styles from "./DataSource.module.scss";

export const DataSource = () => {
  const [dataSourceUrl, setDataSourceUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(null)

  useEffect(() => {
    const checkUrl = async (url) => {
      if (url === "") {
        setIsValidUrl(null)
      } else {
        const isValid = await checkIfUrlIsValid(url)
        setIsValidUrl(isValid)
      }
    }

    checkUrl(dataSourceUrl)
  }, [dataSourceUrl])

  return (
    <Container className="mt-2 ml-2 mr-2 mb-4">
      <h2 className="ml-2 mb-2">Data source url</h2>
      <Row className="ml-2">
        <Form.Group as={Col}>
          <Form.Label>Enter url to your Google Spreadsheet with the data source defined. Please make sure that anyone on the internet can view the spreadsheet!</Form.Label>
          <Form.Control
            className={classNames(
              isValidUrl === true && styles.validUrl,
              isValidUrl === false && styles.invalidUrl
            )}
            type="text"
            value={dataSourceUrl}
            onChange={(event) => setDataSourceUrl(event.target.value)}
          />
        </Form.Group>
      </Row>
      {isValidUrl && (
        <div className={styles.chartLoader}>
          <Chart
            chartType="LineChart"
            spreadSheetUrl={dataSourceUrl}
            chartEvents={[
              {
                eventName: "ready",
                callback: ({ chartWrapper }) => {
                  parseChartData(chartWrapper)
                }
              }
            ]}
          />
        </div>
      )}
    </Container>
  )
}