const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
	ssl: process.env.DATABASE_URL ? true : false,
	// UNCOMMENT FOR DEPLOYED DB
	// ssl: { rejectUnauthorized: false },
	// UNCOMMENT FOR DEPLOYED DB
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://stephenchow@localhost:5432/woebot_takehome",
});

client.connect();

module.exports = client;
