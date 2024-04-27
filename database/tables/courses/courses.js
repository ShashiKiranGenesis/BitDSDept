// Imports from server files
const connect = require("../../connect");


// The Original Courses table Schema
const createTableQuery = `
    CREATE TABLE courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        level_id INT,
        cpw INT,
        code VARCHAR(30) NOT NULL,
        FOREIGN KEY (level_id) REFERENCES academic_levels(id)
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
        await connection.query(createTableQuery);

        console.log("PASS    CODE: DB_TC_08");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_08");
        console.error(error.message);
    } finally {
        connection.end();
    }
})();