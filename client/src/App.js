import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

import "./styles/App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
	let history = useNavigate();

	const [currUser, setCurrUser] = useState("");
	const [users, setUsers] = useState([]);
	const [loginMsg, setLoginMsg] = useState("");

	/*
		-Signup w/ POST request to "api/signup"
	*/
	const signup = async (credentials) => {
		// POST request
		const res = await axios({
			method: "POST",
			url: `${API_URL}/users/signup`,
			data: {
				username: credentials.username,
				email: credentials.email,
				password: credentials.password,
			},
		});

		// Grab token off of payload
		const data = res.data;
		const token = data.token;
		// Decode token
		const decoded = jwt_decode(token);
		// Grab info out of token
		const username = decoded.username;
		const iat = decoded.iat;
		const exp = decoded.exp;

		// Save token/credentials to local storage
		localStorage.setItem("token", token);
		localStorage.setItem("iat", iat);
		localStorage.setItem("exp", exp);
		localStorage.setItem("username", username);

		setCurrUser(username);
		// Redirect user to homepage
		history("/");
	};

	/*
		-Signup w/ POST request to "api/signup"
	*/
	const login = async (credentials) => {
		// POST request
		const res = await axios({
			method: "POST",
			url: `${API_URL}/users/login`,
			data: {
				username: credentials.username,
				password: credentials.password,
			},
		});

		// Grab token off of payload
		const data = res.data;

		if (data.message) {
			setLoginMsg(data.message);
		}

		const token = data.token;
		// Decode token
		const decoded = jwt_decode(token);
		// Grab info out of token
		const username = decoded.username;
		const iat = decoded.iat;
		const exp = decoded.exp;

		// Save token/credentials to local storage
		localStorage.setItem("token", token);
		localStorage.setItem("iat", iat);
		localStorage.setItem("exp", exp);
		localStorage.setItem("username", username);
		setCurrUser(username);
		// Redirect user to homepage
		history("/");
	};

	/*
		- Check credentials in local storage on component initial mount
		- TODO: check if token is expired
	*/
	const checkCredentials = () => {
		// Retrieve credentials from local storage
		const username = localStorage.getItem("username");

		// Set current user in state
		if (username) {
			setCurrUser(username);
		}

		// Remove token from localStorage if expired
		const exp = localStorage.getItem("exp");
		// Curr date
		const date = new Date() / 1000;
		if (exp < date) {
			logout();
		}
	};

	/*
		- Logout by removing token from localStorage
	*/
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("iat");
		localStorage.removeItem("exp");
		localStorage.removeItem("username");
		setCurrUser("");
	};

	/*
		- Get list of all users
		- Must be logged in w/ a valid token
	*/
	const getUsers = async () => {
		// Retrieve token from localStorage
		const token = localStorage.getItem("token");
		// GET request
		const res = await axios({
			method: "GET",
			url: `${API_URL}/users`,
			headers: { Authorization: `Bearer ${token}` },
		});

		const usersArr = res.data;
		setUsers(usersArr);
	};

	/*
		- Component Initial Mount
	*/
	useEffect(() => {
		checkCredentials();
	}, []);

	return (
		<div className="App">
			<Navbar currUser={currUser} logout={logout} />
			<Routes>
				<Route
					path="/"
					element={
						<HomePage currUser={currUser} getUsers={getUsers} users={users} />
					}
				/>
				<Route
					path="/signup"
					element={
						<SignupPage history={history} signup={signup} currUser={currUser} />
					}
				/>
				<Route
					path="/login"
					element={
						<LoginPage
							loginMsg={loginMsg}
							history={history}
							currUser={currUser}
							login={login}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
