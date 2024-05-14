// Imports from server files
const connect = require("../../connect");


// The original instructor_semester_teaching_hours table schema
const createTableQuery = `
    CREATE TABLE instructor_semester_teaching_hours (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        course_name VARCHAR(60) NOT NULL,
        semester TINYINT NOT NULL,
        tce TINYINT NOT NULL,
        pce TINYINT NOT NULL,
        academic_year_start DATE NOT NULL,
        academic_year_end DATE NOT NULL,
        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),
        FOREIGN KEY (course_name) REFERENCES courses(name),
        CONSTRAINT unique_row_isth UNIQUE(vtu_id, course_name, semester, tce, pce, academic_year_start, academic_year_end)
    );
`;

// More Details about the Table
/*  
    tce - Theory Classes Executed
    pce - Practical Classes Executed
*/


// For any Altering in the future
const alterTableQuery = `
	
`;

(async function () {
    let connection;
    try {
        connection = await connect();

        /* Load your Query here */
        await connection.query(createTableQuery);

        console.log("PASS    CODE: DB_TC_09");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_09");
        console.error(error.message);
    } finally {
        connection.end();
    }
})();