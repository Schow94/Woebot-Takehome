import React from "react";

import "../styles/UserList.css";

const UserList = ({ users }) => {
	return (
		<div className="user-list-container">
			<div className="mother-img-container">
				<div className="text-container">
					<h1>A reliable ally you can trust</h1>
					<p>
						Woebot’s ability to form close relationships helps make our
						solutions highly engaging. In as little as 3 to 5 days Woebot has
						been shown to form a trusted bond with users.
					</p>
					<button className="read-study-btn">I want to read the study</button>
				</div>
				<img className="mother-img" src="mother.jpeg" alt="mother" />
			</div>

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
								{/* <div className="divider-container">
									<hr className="divider" />
								</div> */}
							</>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default UserList;
