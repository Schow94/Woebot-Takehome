const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// Main express app
const app = express();

const userRoutes = require("./routes/users");

const PORT = process.env.PORT || 8000;

// ------------------------------- MIDDLEWARES ---------------------------
// Enable CORS for all origins
app.use(cors());
// Request logger for NodeJs
app.use(morgan("tiny"));
// Parse all requests before handlers. Puts data on req.body
app.use(bodyParser.json());

// --------------------------------------- ROUTES ----------------------------------
app.use("/users", userRoutes);

// ---------------------------- ERROR HANDLING ------------------------
// Resource not found
app.use((req, res, next) => {
	var err = new Error("Not found");
	err.status = 404;
	return next(err);
});

// Send back 500 for other errors
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	return res.json({
		message: err.message,
		// Only display err msg when in dev
		error: app.get("env") === "development" ? err : {},
	});
});

// App listens on PORT 8000 or dev
app.listen(PORT, () => {
	if (app.get("env") === "development") {
		console.log(`Listening on PORT: ${PORT}`);
	} else {
		console.log("In Production");
	}
});
