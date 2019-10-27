import React from "react";
import { useHistory } from "react-router-dom";

const Login = ({
	handleLogin
}) => {
	const history = useHistory();

	const handleOnClick = () => {
		handleLogin();
		history.push("/");
	};

	return <div className="text-center">
		<h4>Please login.</h4>

		<button
			className="btn btn-primary"
			onClick={handleOnClick}
		>
            Login
		</button>
	</div>;
};

export default Login;