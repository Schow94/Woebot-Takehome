import React, { useEffect } from "react";

import SignupForm from "../components/SignupForm";

import "../styles/Signup.css";

const SignupPage = ({ signup, currUser, history }) => {
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
		<div className="signup-container">
			<h1>Sign up</h1>

			<SignupForm signup={signup} />
		</div>
	);
};

export default SignupPage;
