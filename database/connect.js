// Importing from Node Modules
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

// Importing from Server Files
const generateResponse = require("../helpers/response/generateResponse");

// Configuring the Backend middlewares and dependencies
dotenv.config();

// Create the connection to database
async function connect() {
	try {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			database: process.env.DB_DATABASE,
			password: process.env.DB_PASSWORD
		});
		return connection;

	} catch (error) {
		console.log("Something went wrong while connecting to Data Base");

		const result = generateResponse(
			true,
			error.message,
			error.errno,
			error
		);
		console.log(result);

		return result;
	}

}

module.exports = connect;