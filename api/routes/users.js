const express = require("express");
// Mini app
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

// ------------------------ EXPRESS MIDDLEWARES --------------------------
/*
	- Check if user's token is valid before ALL requests
*/
const isLoggedIn = async (req, res, next) => {
	try {
		// Remove 'Bearer' from token
		const authHeaderValue = req.headers.authorization.slice(7);

		// Verify that token is valid
		const token = jwt.verify(authHeaderValue, SECRET);
		// Decode token & grab username
		const username = jwt.decode(authHeaderValue).username;
		// Check that user is a valid row in db
		const user = await db.query("SELECT * FROM users WHERE username=$1", [
			username,
		]);

		req.username = username;
		req.user_id = user.rows[0].id;

		return next();
	} catch (e) {
		// Invalid token
		return res.status(401).json({ message: "Unauthorized" });
	}
};

// -------------------------- USER ROUTES ---------------------------
/*
	- Get list of all users
*/
router.get("/", isLoggedIn, async (req, res, next) => {
	try {
		// Query db for all users. Don't return hashed pw to client
		const result = await db.query("SELECT id, username, email FROM users");

		// Send list of users in db back to user
		return res.json(result.rows);
	} catch (e) {
		return next(e);
	}
});

/*
	- Signup Route
*/
router.post("/signup", async (req, res, next) => {
	try {
		// bcrypt.hash(unhashedPw, saltRounds)
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Add new user to db
		const result = await db.query(
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
			[req.body.username, req.body.email, hashedPassword]
		);

		// Create token & include username
		const token = jwt.sign(
			{
				username: req.body.username,
			},
			SECRET,
			{ expiresIn: 60 * 60 }
		);

		// Send token back to user
		return res.json({ token });
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

/*
	- Login Route
*/
router.post("/login", async (req, res, next) => {
	try {
		// Check if user in db
		const foundUser = await db.query(
			"SELECT * FROM users WHERE username=$1 LIMIT 1",
			[req.body.username]
		);

		// user not found in db
		if (foundUser.rows.length === 0) {
			return res.json({ message: "Invalid Username" });
		}

		// compare hashedPw to unhashedPw
		const verifiedPw = await bcrypt.compare(
			req.body.password,
			foundUser.rows[0].password
		);

		// invalid pw
		if (!verifiedPw) {
			return res.json({ message: "Invalid Password" });
		}

		// Valid Credentials - Create token & include username
		const token = jwt.sign({ username: foundUser.rows[0].username }, SECRET, {
			expiresIn: 60 * 60,
		});

		// Send token back to user
		return res.json({ token });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
