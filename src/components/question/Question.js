import React, { Component, useState, useRef } from "react";

import { questionsApi, answersApi } from "../../providers/api";

import "./Question.scss";

const Answer = ({ answerer, text, profiles = [] }) => {
	const user = profiles.find(profile => profile.id === answerer);
	return (<span className="answer"><p>{text}</p><p className="user-name">{user && user.name}</p></span>);
};


const QuestionCard = ({ id, text, answers = [], refreshAnswers, profiles }) => {
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
				{answers && answers.length ? answers.map(answer => <Answer profiles={profiles} answerer={answer.createdBy} key={answer.id} text={answer.text} />)
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

const AddQuestion = ({ userId, profiles, refreshQuestions }) => {
	const [question, setNewQuestion] = useState("");
	const inputRef = useRef(null);

	const user = profiles.find(profile => profile.id = userId);

	const handleKeyPress = (e) => {
		setNewQuestion(e.target.value);
	};

	const submitQuestion = () => {
		const obj = {
			"text": question,
			"created_at": "11:30am",
			"solution_id": null,
			"created_by": user.id,
			"tags": []
		};
		questionsApi.post(obj);
		inputRef.current.value = null;
		refreshQuestions(obj);
	};

	return (<div style={{ "padding": "0 10%" }} className="input-group mb-3">
		<input ref={inputRef} onKeyUp={(e) => handleKeyPress(e)} type="text" className="form-control" placeholder="Ask a question" aria-label="Recipient's username" aria-describedby="button-addon2" />
		<div className="input-group-append">
			<button onClick={() => submitQuestion()} className="btn btn-outline-secondary" type="button" id="button-addon2">Ask!</button>
		</div>
	</div>);
};

class Question extends Component {
	// constructor(props) {
	// 	super();
	// 	console.log(props, '123');
	// 	this.state = {
	// 		questions: props.questions,
	// 		//profiles: props.profiles,
	// 		currentUser: props.userId
	// 	};
	// }

	refreshAnswers = newAnswer => {
		this.setState({
			questions: this.props.questions.map(question => question.id === newAnswer.question_id ?
				{ ...question, answers: [...question.answers, newAnswer] } : question)
		});
	};

	refreshQuestions = newQuestion => {
		console.log({ questions: [...this.props.questions, newQuestion] }, "yay");
		this.setState({ questions: [...this.props.questions, newQuestion] });
	};

	render() {
		return <React.Fragment>
			<AddQuestion refreshQuestions={this.refreshQuestions} userId={this.props.userId} profiles={this.props.profiles} />
			<div className="question-wrapper">
				{this.props.questions.map(question => {
					return <QuestionCard
						key={question.id}
						id={question.id}
						answers={question.answers}
						text={question.text}
						profiles={this.props.profiles}
						refreshAnswers={this.refreshAnswers} />;

				})}
			</div>
		</React.Fragment>;
	}
}

export default Question;
