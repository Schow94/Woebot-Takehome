import React, { useState, useEffect } from "react";

import "../styles/Login.css";

const LoginPage = ({ login, currUser, history, loginMsg }) => {
	const [inputVals, setInputVals] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setInputVals({ ...inputVals, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login(inputVals);
	};

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
			<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
				<input
					onChange={(e) => handleChange(e)}
					className="login-input"
					name="username"
					value={inputVals.username}
					placeholder="username"
					autoComplete="off"
					required
				/>
				<input
					onChange={(e) => handleChange(e)}
					className="login-input"
					name="password"
					value={inputVals.password}
					placeholder="password"
					autoComplete="off"
					type="password"
					required
				/>

				<button className="button">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
