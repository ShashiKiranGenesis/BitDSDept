// Importing from Node Modules
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

// Importing from Server Files
const generateResponse = require("../helpers/response/generateResponse");

// Configuring the Backend middlewares and dependencies
dotenv.config();

// Create the connection to database
let connection = undefined;

async function connect() {
	if (!(await connectionExists()))
		try {
			console.log("LOADING    CODE: DB_CONN");
			connection = await mysql.createConnection({
				host: process.env.DB_HOST,
				user: process.env.DB_USERNAME,
				database: process.env.DB_DATABASE,
				password: process.env.DB_PASSWORD
			});
			console.log("PASS    CODE: DB_CONN");

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
	else
		return connection;
}

async function connectionExists() {
	if (connection === undefined) return false;
	try {
		const rows = await connection.query('SELECT 1 + 1 AS solution');
		if (rows[0][0]?.solution == 2) return true;
		return false;
	} catch (error) {
		console.log("FAIL    CODE: DB_CONN\n", error);
		return false;
	}
}

module.exports = connect;