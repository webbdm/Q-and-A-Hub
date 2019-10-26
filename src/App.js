import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import Header from "./components/Header";
import Profile from "./components/profile/Profile";
import Question from "./components/question/Question";

import "./App.css";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />

					<Switch>
						<Route path="/question">
							<Question />
						</Route>

						<Route path="/">
							<Profile />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
