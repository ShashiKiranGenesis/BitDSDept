// All the imports must be in alphabetical order

const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

//Configuring the Backend middlewares and dependencies

dotenv.config();

// Create the connection to database

async function connect() {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD
	});
	return connection;
}

module.exports = connect;