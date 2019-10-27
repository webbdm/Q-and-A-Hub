import React, { Component, useState, useRef } from "react";

import { questionsApi, answersApi } from "../../providers/api";

import "./Question.scss";

const Answer = ({ text }) => <p className="answer">{text}</p>;

const QuestionCard = ({ id, text, answers = [], refreshAnswers }) => {
	const [newAnswer, setNewAnswer] = useState("");
	const inputRef = useRef(null);

	const handleKeyPress = (e) => {
		setNewAnswer(e.target.value);
	};

	const submitAnswer = () => {
		const obj = {
			"text": newAnswer,
			"created_at": "11:30am",
			"question_id": id,
			"created_by": "3"
		};
		answersApi.post(obj);
		inputRef.current.value = null;
		refreshAnswers(obj);
	};

	return (<div className="question">
		<div className="card">
			<div className="card-header">
				<h3>{text}</h3>
			</div>
			<p style={{ "padding": "0 20px", "margin": 0, "color": "white" }}>{answers.length} answers</p>
			<div className="card-body">
				{answers && answers.length ? answers.map(answer => <Answer key={answer.id} text={answer.text} />)
					: <p>No answers yet. Be the first!</p>}
			</div>
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">Answer:</span>
				</div>
				{/* <textarea ref={inputRef} onKeyUp={(e) => handleKeyPress(e)} className="form-control" aria-label="With textarea"></textarea> */}
				<input placeholder="..." ref={inputRef} onKeyUp={(e) => handleKeyPress(e)} className="form-control" aria-label="Username" aria-describedby="addon-wrapping"></input>
				<button className="addAnswer" onClick={() => submitAnswer()}>Submit</button>
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
				const ans = answers.map(a => a.data).flat();
				const qs = this.state.questions;
				this.setState({ questions: qs.map(q => ({ ...q, answers: ans.filter(a => a.question_id === q.id) })) });
			});
	}

	componentDidMount() {
		this.getQuestions();
	}

	refreshAnswers = newAnswer => {
		this.setState({
			questions: this.state.questions.map(question => question.id === newAnswer.question_id ?
				{ ...question, answers: [...question.answers, newAnswer] } : question)
		});
	};


	render() {
		return <div className="question-wrapper">
			{this.state.questions.map(question => {
				return <QuestionCard
					key={question.id}
					id={question.id}
					answers={question.answers}
					text={question.text}
					refreshAnswers={this.refreshAnswers} />;

			})}
		</div>;
	}
}

export default Question;
