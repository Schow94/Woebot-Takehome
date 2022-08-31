import React, { useState, useEffect } from "react";

import "../styles/Signup.css";

const SignupPage = ({ signup, currUser, history }) => {
	const [inputVals, setInputVals] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setInputVals({ ...inputVals, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(inputVals);
	};

	useEffect(() => {
		// Redirect user to Landing page if they're already logged in
		if (currUser) {
			history("/");
		}
	}, [currUser]);

	return (
		<div className="signup-container">
			<h1>Sign up</h1>
			<form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
				<input
					onChange={(e) => handleChange(e)}
					className="signup-input"
					name="email"
					value={inputVals.email}
					placeholder="email"
					autoComplete="off"
					type="email"
					required
				/>
				<input
					onChange={(e) => handleChange(e)}
					className="signup-input"
					name="username"
					value={inputVals.username}
					placeholder="username"
					autoComplete="off"
					required
				/>
				<input
					onChange={(e) => handleChange(e)}
					className="signup-input"
					name="password"
					value={inputVals.password}
					placeholder="password"
					autoComplete="off"
					type="password"
					required
				/>

				<button className="button">Signup</button>
			</form>
		</div>
	);
};

export default SignupPage;
