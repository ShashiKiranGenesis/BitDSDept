// Imports from server files
const connect = require("../../connect");


// The original qualifications table schema
const createTableQuery = `
    CREATE TABLE qualifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        duration INT NOT NULL,
        school VARCHAR(255) NOT NULL,
        sponsoring_agency VARCHAR(255),
        end_date DATE NOT NULL,
        place VARCHAR(100) NOT NULL,
        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id)
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

        console.log("PASS    CODE: DB_TC_06");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_06");
        console.error(error.message);
    } finally {
        connection.end();
    }
})();