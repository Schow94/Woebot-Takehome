import React, { useEffect } from "react";

import UserList from "../components/UserList";

import "../styles/HomePage.css";

const HomePage = ({ currUser, getUsers, users }) => {
	useEffect(() => {
		// Only get list of users when logged in
		if (currUser) getUsers();
	}, [currUser]);
	return (
		<>
			{currUser ? (
				<UserList users={users} />
			) : (
				<div className="homepage-container">
					<img
						className="banner-img"
						src="woebot_banner.png"
						alt="banner"></img>
				</div>
			)}
		</>
	);
};

export default HomePage;
