import React, { useState } from "react";

const SignupForm = ({ signup }) => {
	const [inputVals, setInputVals] = useState({
		username: "",
		email: "",
		password: "",
	});

	/*
        - Update username, email, password input state
    */
	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setInputVals({ ...inputVals, [name]: value });
	};

	/*
        - sign user up by sending POST request to '/signup' route
    */
	const handleSubmit = (e) => {
		e.preventDefault();
		signup(inputVals);
	};

	return (
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
	);
};

export default SignupForm;
