import React from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = ({ logout, currUser }) => {
	const handleLogout = () => {
		logout();
	};
	return (
		<div className="nav-container">
			<Link to="/">
				<img className="logo" src={"logo.svg"} alt="React Logo" />
			</Link>
			<nav className="navbar">
				<li className="nav-link current-user">
					{currUser ? `Logged in as ${currUser}` : ``}
				</li>
				{currUser ? (
					<li onClick={() => handleLogout()} className="nav-link logout-btn">
						Logout
					</li>
				) : (
					<Link to="/login" className="nav-link login-btn">
						Login
					</Link>
				)}
				{currUser ? (
					``
				) : (
					<Link to="/signup" className="nav-link signup">
						Signup
					</Link>
				)}
				<li className="nav-link">For Organizations</li>
				<li className="nav-link">What Powers Woebot</li>
				<li className="nav-link">Try Woebot</li>
				<li className="nav-link">Careers</li>
				<li className="nav-link">About Us</li>
				<li className="partner nav-link">Partner With Us</li>
			</nav>
		</div>
	);
};

export default Navbar;
