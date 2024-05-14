// Imports from server files
const connect = require("../../connect");


// The Original Courses table Schema
const createTableQuery = `
    CREATE TABLE courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        a_level VARCHAR(50) NOT NULL,
        cpw TINYINT NOT NULL,
        lpw TINYINT NOT NULL,
        code VARCHAR(10) NOT NULL,
        FOREIGN KEY (a_level) REFERENCES academic_levels(name),
        INDEX idx_course_name (name)
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