// Imports from Server Files
const connect = require("./../../connect");

// Query to Create employee_designation Table
const createTableQuery = `
    CREATE TABLE employee_designation (
        vtu_id varchar(15),
        title varchar(40),
        PRIMARY KEY(vtu_id, title),
        FOREIGN KEY(vtu_id) REFERENCES employees(vtu_id),
        FOREIGN KEY(title) REFERENCES designations(title)
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

		console.log("PASS    CODE: DB_TC_05");

	} catch (error) {

		console.error("ERROR    CODE: DB_TC_05");
		console.error(error.message);

	}
})();