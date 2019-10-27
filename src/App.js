import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { profiles } from "./providers/api";

import Header from "./components/Header";
import Profile from "./components/profile/Profile";
import Question from "./components/question/Question";

import "./App.css";

class App extends Component {
	constructor() {
		super();

		this.state = {
			isNewUser: false,
			userId: 1,
			userProfile: {}
		};
	}

	// TODO: make this work with API
	getAuthedUserData() {
		return profiles.get({ params: { user_id: this.state.userId } })
			.then(({ data }) => {
				const [ firstUserData = {} ] = data;
				this.setState({
					isNewUser: !Object.keys(firstUserData).length,
					userProfile: firstUserData
				});
			});
	}

	componentDidMount() {
		this.getAuthedUserData();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header />

					<div className="container">
						<Switch>
							<Route path="/question">
								<Question />
							</Route>

							<Route
								path="/profile"
								render={() => <Profile
									isNewUser={this.state.isNewUser}
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
