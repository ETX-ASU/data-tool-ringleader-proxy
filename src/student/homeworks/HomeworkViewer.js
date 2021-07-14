import React, {Fragment} from 'react';
import "./homeworks.scss";
import HeaderBar from "../../app/components/HeaderBar";
import { ToolHomework } from "../../tool/ToolHomework";


function HomeworkViewer(props) {
	const {homework, assignment} = props;

	return (
		<Fragment>
      <HeaderBar title={assignment.title} smallTitle />

      <ToolHomework
        isReadOnly
        isShowCorrect
        toolAssignmentData={assignment.toolAssignmentData}
        toolHomeworkData={homework.toolHomeworkData}
      />
    </Fragment>
	)
}

export default HomeworkViewer;