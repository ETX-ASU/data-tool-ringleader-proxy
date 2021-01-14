import React, {Fragment} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import "./homeworks.scss";
import HeaderBar from "../../app/components/HeaderBar";
import { ToolHomework } from "../../tool/ToolHomework";


function HomeworkViewer(props) {
	const {homework, assignment} = props;

	return (
		<Fragment>
      <HeaderBar title={assignment.title} />

      <Container className='mt-2 ml-1 mr-2'>
        <Row className={'mt-4'}>
          <Col><p>{assignment.summary}</p></Col>
        </Row>

        <ToolHomework
          isReadOnly
          isShowCorrect
          toolAssignmentData={assignment.toolAssignmentData}
          toolHomeworkData={homework.toolHomeworkData}
        />

      </Container>
    </Fragment>
	)
}

export default HomeworkViewer;