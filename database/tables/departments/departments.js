// Imports from server files
const connect = require("../../connect");

// The original departments table schema
const createTableQuery = `
	CREATE TABLE departments (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(50) NOT NULL,
		established_on DATE NOT NULL,
		UNIQUE KEY unique_department_name (name)
	)
`;

// For any ALtering in the future
const alterTableQuery = `

`;

(async function () {
	let connection;
	try {
		connection = await connect();

		/* Load your Query here */
		await connection.query(/* Load your Query here */);

		console.log("PASS    CODE: DB_TC_01");
	} catch (error) {
		console.error("ERROR    CODE: DB_TC_01");
		console.error(error);
	} finally {
		connection.end();
	}
})();