// Imports from server files
const connect = require("../../connect");


// The original academic_levels table schema
const createTableQuery = `
    CREATE TABLE academic_levels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level_name VARCHAR(50) NOT NULL UNIQUE
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
    } finally {
        connection.end();
    }
})();