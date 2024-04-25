// Imports from Node Modules
const dotenv = require("dotenv");

// Imports from Server Files
const connect = require("../../connect");

//Configuring the Backend Middlewares and Dependencies
dotenv.config();

// The Original users Table Schema
const createTableQuery = `
	CREATE TABLE users (
		vtu_id VARCHAR(15) UNIQUE NOT NULL,
		password VARCHAR(60) NOT NULL,
		FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),
		PRIMARY KEY (vtu_id)
	);
`;

// For any Altering in the Future
const alterTableQuery = `

`;

(async function () {
	let connection;
	try {
		connection = await connect();

		/* Load your Query here */
		await connection.query(/* Load your Query here */);

		console.log("PASS    CODE: DB_TC_04");
	} catch (error) {
		console.error("ERROR    CODE: DB_TC_04");
		console.error(error.message);
	} finally {
		connection.end();
	}
})();