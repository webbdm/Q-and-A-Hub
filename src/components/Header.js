import React from "react";
import Align from "./layout/Align";
import { Link } from "react-router-dom";

const Header = () => {
	return <header className="App-header">
		<Align>
			<div className="nav">
				<Link
					className="nav-link"
					to="/"
				>
                    Q and A
				</Link>

				<Link
					className="nav-link"
					to="/"
				>
                    Profile
				</Link>

				<Link
					className="nav-link"
					to="/question"
				>
                    Question
				</Link>
			</div>
		</Align>
	</header>;
};

export default Header;