// Imports from server files
const connect = require("../../connect");

// The original designations table schema
const createTableQuery = `
	CREATE TABLE designations (
        title VARCHAR(40) UNIQUE NOT NULL,
        level INT NOT NULL DEFAULT 0,
		PRIMARY KEY(title, level),
		INDEX idx_level (level) 
	);
`;

// For any ALtering in the future
const alterTableQuery = `

`;

(async function () {
	let connection;
	try {
		connection = await connect();

		/* Load your Query here */
		await connection.query(createTableQuery);

		console.log("PASS    CODE: DB_TC_03");
	} catch (error) {
		console.error("ERROR    CODE: DB_TC_03");
		console.error(error);
	}
})();