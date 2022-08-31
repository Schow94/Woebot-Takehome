import React, { useState } from "react";

const LoginForm = ({ login }) => {
	const [inputVals, setInputVals] = useState({
		username: "",
		password: "",
	});

	/*
		- Update username & password input state
	*/
	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setInputVals({ ...inputVals, [name]: value });
	};

	/*
		- login by sending POST request to '/login' route
	*/
	const handleSubmit = (e) => {
		e.preventDefault();
		login(inputVals);
	};

	return (
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
	);
};

export default LoginForm;
