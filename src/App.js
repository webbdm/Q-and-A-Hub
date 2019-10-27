import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { profiles } from "./providers/api";

import Community from "./components/community/Community";
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import Question from "./components/question/Question";

import "./App.css";

class App extends Component {
	constructor() {
		super();

		this.state = {
			isNewUser: false,
			profiles: [],
			userId: 1,
			userProfile: {}
		};

		this.getAllProfiles = this.getAllProfiles.bind(this);
		this.setAuthedUserData = this.setAuthedUserData.bind(this);
	}

	getAllProfiles() {
		// TODO: exclude the auther users profile once the API is active
		return profiles.get({ params: { user_id_ne: this.state.userId } })
			.then(({ data }) => {
				this.setState(state => ({ ...state, profiles: data }));
			});
	}

	// TODO: make this work with API
	getAuthedUserData() {
		return profiles.get({ params: { user_id: this.state.userId } })
			.then(({ data }) => {
				const [firstUserData = {}] = data;
				this.setAuthedUserData(firstUserData);
			});
	}

	setAuthedUserData(userData) {
		this.setState({
			isNewUser: !Object.keys(userData).length,
			userProfile: userData
		});
	}

	componentDidMount() {
		Promise.all([
			this.getAllProfiles(),
			this.getAuthedUserData()
		]);
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header />

					<div className="container">
						<Switch>
							<Route exact path="/">
								<Question />
							</Route>
							<Route path="/community">
								<Community />
							</Route>
							<Route
								path="/login"
								component={Login}
							/>

							<Route
								path="/profile"
								render={() => <Profile
									isNewUser={this.state.isNewUser}
									profiles={this.state.profiles}
									setAuthedUserData={this.setAuthedUserData}
									userProfile={this.state.userProfile}
								/>}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
