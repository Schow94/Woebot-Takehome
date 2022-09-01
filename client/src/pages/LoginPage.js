import React, { useEffect } from "react";

import LoginForm from "../components/LoginForm";

import "../styles/Login.css";

const LoginPage = ({ login, currUser, history, loginMsg }) => {
	/*
		- Redirect user to home page after login
	*/
	useEffect(() => {
		// Redirect user to Landing page if they're already logged in
		if (currUser) {
			history("/");
		}
	}, [currUser]);

	return (
		<div className="login-container">
			<h1 className="login-header">Login</h1>
			{loginMsg === "Invalid Username" || loginMsg === "Invalid Password" ? (
				<div className="invalid-container">
					<h3>Please provide valid credentials</h3>
				</div>
			) : null}

			<LoginForm login={login} />
		</div>
	);
};

export default LoginPage;
