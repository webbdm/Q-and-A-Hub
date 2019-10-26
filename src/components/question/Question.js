import React, { Component } from "react";

import './Question.scss';

const QuestionCard = () => <div className="question">
	<div className="card">
		<div className="card-header">
			Why Does X do Y?
  </div>
		<div className="card-body">

		</div>
	</div>
</div>

class Question extends Component {
	render() {
		return (
			<div className="question-wrapper">
				<QuestionCard />
			</div>
		);
	}
}

export default Question;
