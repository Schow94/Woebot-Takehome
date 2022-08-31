import React from "react";

import Mother from "./Mother";

import "../styles/UserList.css";

const UserList = ({ users }) => {
	return (
		<div className="user-list-container">
			<Mother />

			<div className="users">
				<h3>Registered Users:</h3>
				<ul className="users-list">
					{users.map((x) => {
						return (
							<>
								<li className="user-list-item" key={x.id}>
									<p>Username: {x.username}</p>
									<p>Email: {x.email}</p>
								</li>
							</>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default UserList;
