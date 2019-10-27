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
import PrivateRoute from "./components/global/PrivateRoute";
import Profile from "./components/profile/Profile";
import Question from "./components/question/Question";

import "./App.css";

class App extends Component {
	constructor() {
		super();

		this.state = {
			isAuthenticated: true,
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

	handleLogin = () => {
		// TODO: get to work with server / SSO
		this.setState({ isAuthenticated: true });
	}

	handleLogout = () => {
		// TODO: get to work with server / SSO
		this.setState({ isAuthenticated: false });
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
		const { isAuthenticated } = this.state;

		return (
			<Router>
				<div className="App">
					<Header
						handleLogout={this.handleLogout}
						isAuthenticated={isAuthenticated}
					/>

					<div className="container">
						<Switch>
							<Route exact path="/">
								<Question profiles={this.state.profiles} />
							</Route>
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
								<Question />
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
