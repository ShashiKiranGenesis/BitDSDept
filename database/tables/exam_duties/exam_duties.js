// Imports from server files
const connect = require("../../connect");


// The original examination_duties table schema
const createTableQuery = `
    CREATE TABLE examination_duties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        academic_year_start DATE NOT NULL,
        academic_year_end DATE NOT NULL,
        exam_type VARCHAR(20) NOT NULL,
        duty_assigned VARCHAR(20) NOT NULL,
        extent_carried_out TINYINT NOT NULL,
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_ed UNIQUE(
            vtu_id, 
            academic_year_start, 
            academic_year_end,
            exam_type,
            duty_assigned,
            extent_carried_out,
            api_score
        )
    );
`;

// More Details about the Table
/*  
    extent_carried_out is in percentage (0-100)
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

        console.log("PASS    CODE: DB_TC_12");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_12");
        console.error(error.message);
    }
})();