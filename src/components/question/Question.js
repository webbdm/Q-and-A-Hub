import React, { Component } from "react";

import { questionsApi, answersApi } from "../../providers/api";

import './Question.scss';

const Answer = ({ text }) => <h1>{text}</h1>;

const QuestionCard = ({ text, answers }) => <div className="question">
	<div className="card">
		<div className="card-header">
			{text}
		</div>
		<div className="card-body">
			{answers && answers.map(answer => <Answer key={answer.id} text={answer.text} />)}
		</div>
	</div>
</div>

class Question extends Component {
	constructor() {
		super();

		this.state = {
			questions: []
		};
	}

	// TODO: make this work with API
	getQuestions() {
		return questionsApi.get()
			.then(({ data }) => {
				const qIds = data.map(q => answersApi.get({ params: { question_id: q.id } }));

				this.setState({ questions: data });

				return Promise.all([data, ...qIds]);

			}).then(([questions, ...answers]) => {
				const ans = answers.map(a => a.data[0]);
				const qs = this.state.questions;
				this.setState({ questions: qs.map(q => ({ ...q, answers: ans.filter(a => a.question_id === q.id) })) });

			});
	}

	componentDidMount() {
		this.getQuestions();
	}
	render() {
		return (
			<div className="question-wrapper">
				{this.state.questions.map(question => <QuestionCard key={question.id} answers={question.answers} text={question.text} />)}
			</div>
		);
	}
}

export default Question;
