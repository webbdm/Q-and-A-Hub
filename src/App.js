import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { profiles as profilesApi, questionsApi, answersApi } from "./providers/api";

import Community from "./components/community/Community";
import Header from "./components/Header";
import Login from "./components/Login";
import PrivateRoute from "./components/global/PrivateRoute";
import Profile from "./components/profile/Profile";
import Question from "./components/question/Question";

import "./App.css";

class App extends Component {
	state = {
		isAuthenticated: true,
		isNewUser: false,
		profiles: [],
		questions: [],
		userId: "asdsadhjk1",
		userProfile: {}
	}

	getAllProfiles = async () => {
		// TODO: exclude the auther users profile once the API is active
		const { data } = await profilesApi.get();
		const profiles = data.filter(({ userId }) => userId !== this.state.userId);
		this.setState(state => ({ ...state, profiles }));
	}

	// TODO: make this work with API
	getAuthedUserData = async () => {
		const { data } = await profilesApi.get({ params: { user_id: this.state.userId } });
		const userProfile = data.find(({ userId }) => userId === this.state.userId);
		this.setAuthedUserData(userProfile);
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

	handleLogin = () => {
		// TODO: get to work with server / SSO
		this.setState({ isAuthenticated: true });
	}

	handleLogout = () => {
		// TODO: get to work with server / SSO
		this.setState({ isAuthenticated: false });
	}

	setAuthedUserData = (userData) => {
		this.setState({
			isNewUser: !Object.keys(userData).length,
			userProfile: userData
		});
	}

	async componentDidMount() {
		await Promise.all([
			this.getAllProfiles(),
			this.getAuthedUserData()
		]);

		await this.getQuestions();
	}

	render() {
		const { isAuthenticated, userId, profiles, questions } = this.state;

		return (
			<Router>
				<div className="App">
					<Header
						handleLogout={this.handleLogout}
						isAuthenticated={isAuthenticated}
					/>

					<div className="container">
						<Switch>
							{/* <Route exact path="/">
								<Question question={questions} userId={userId} profiles={profiles} />
							</Route> */}
							<Route path="/community">
								<Community />
							</Route>
							<Route
								path="/login"
								render={() => <Login
									handleLogin={this.handleLogin}
								/>}
							/>

							<PrivateRoute
								exact
								isAuthenticated={isAuthenticated}
								path="/"
							>
								<Question questions={questions} userId={userId} profiles={profiles} />
							</PrivateRoute>

							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/community"
							>
								<Community />
							</PrivateRoute>

							<PrivateRoute
								isAuthenticated={isAuthenticated}
								path="/profile"
							>
								<Profile
									isNewUser={this.state.isNewUser}
									profiles={this.state.profiles}
									setAuthedUserData={this.setAuthedUserData}
									userProfile={this.state.userProfile}
								/>
							</PrivateRoute>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
