import React, { Component, useState } from "react";

import { questionsApi, answersApi } from "../../providers/api";

import "./Question.scss";

const Answer = ({ text }) => <p className="answer">{text}</p>;

const QuestionCard = ({ id, text, answers = [] }) => {
	const [newAnswer, setNewAnswer] = useState("Type your answer");

	const handleKeyPress = (e) => {

		setNewAnswer(e.target.value);

		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			answersApi.post({
				"text": newAnswer,
				"created_at": "11:30am",
				"question_id": id,
				"created_by": "3"
			});


		}

	};

	return (<div className="question">
		<div className="card">
			<div className="card-header">
				<h3>{text}</h3>
			</div>
			<p style={{ "padding": "0 20px", "margin": 0, "color": "black" }}>{answers.length} answers</p>
			<div className="card-body">
				{answers && answers.length ? answers.map(answer => <Answer key={answer.id} text={answer.text} />)
					: <p>No answers yet. Be the first!</p>}
			</div>
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">Answer</span>
				</div>
				<textarea onKeyUp={(e) => handleKeyPress(e)} className="form-control" aria-label="With textarea"></textarea>
			</div>

		</div>
	</div>);
};

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

				return Promise.all(qIds);
			}).then((answers) => {
				const ans = answers.map(a => a.data)[0];
				const qs = this.state.questions;
				this.setState({ questions: qs.map(q => ({ ...q, answers: ans.filter(a => a.question_id === q.id) })) });
			});
	}

	componentDidMount() {
		this.getQuestions();
	}

	render() {
		return <div className="question-wrapper">
			{this.state.questions.map(question => {
				return <QuestionCard
					key={question.id}
					id={question.id}
					answers={question.answers}
					text={question.text} />
			})}
		</div>
	}
}

export default Question;
