// Imports from server files
const connect = require("../../connect");


// The original employees table schema
const createTableQuery = `
	CREATE TABLE employees (
		id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) UNIQUE NOT NULL,
		full_name VARCHAR(50) NOT NULL,
		father_name VARCHAR(50) NOT NULL,
        mother_name VARCHAR(50) NOT NULL,
        mobile VARCHAR(10) UNIQUE NOT NULL,
        emergency_mobile VARCHAR(10) NOT NULL,
        pad VARCHAR(270) NOT NULL,
        email_address VARCHAR(40) UNIQUE,
		pan_number VARCHAR(60) UNIQUE
	);
`;

// For any Altering in the future
const alterTableQuery = `
	
`;

(async function () {
	let connection;
	try {
		connection = await connect();

		/* Load your Query here */
		await connection.query(/* Load your Query here */);

		console.log("PASS    CODE: DB_TC_02");
	} catch (error) {
		console.error("ERROR    CODE: DB_TC_02");
		console.error(error.message);
	} finally {
		connection.end();
	}
})();