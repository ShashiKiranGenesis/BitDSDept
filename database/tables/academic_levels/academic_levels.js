// Imports from server files
const connect = require("../../connect");


// The original academic_levels table schema
const createTableQuery = `
    CREATE TABLE academic_levels (
        name VARCHAR(50) PRIMARY KEY,
        duration_in_months TINYINT NOT NULL
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
        await connection.query(createTableQuery);

        console.log("PASS    CODE: DB_TC_07");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_07");
        console.error(error.message);
    }
})();