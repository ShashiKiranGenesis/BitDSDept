// Imports from server files
const connect = require("../../connect");


// The original additional_resources_to_students table schema
const createTableQuery = `
    CREATE TABLE additional_resources_to_students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        academic_year_start DATE NOT NULL,
        academic_year_end DATE NOT NULL,
        course_name VARCHAR(60) NOT NULL,
        consulted_from VARCHAR(200) NOT NULL,
        prescribed_resources VARCHAR(200) NOT NULL,
        additional_resources_provided VARCHAR(200) NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),
        FOREIGN KEY (course_name) REFERENCES courses(name),

        CONSTRAINT unique_row_ars UNIQUE(
            vtu_id, 
            academic_year_start, 
            academic_year_end,
            course_name, 
            consulted_from, 
            prescribed_resources, 
            additional_resources_provided
        )
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

        console.log("PASS    CODE: DB_TC_10");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_10");
        console.error(error.message);
    } finally {
        connection.end();
    }
})();