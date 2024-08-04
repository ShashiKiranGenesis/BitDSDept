// Imports from server files
const connect = require("../../connect");


// The original research_guidance table schema
const createTableQuery = `
    CREATE TABLE research_guidance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        academic_year_start DATE NOT NULL,
        academic_year_end DATE NOT NULL,
        course_type VARCHAR(50) NOT NULL,
        enrolled TINYINT NOT NULL,
        thesis_submitted VARCHAR(100) NOT NULL,
        degree_awarded VARCHAR(100),
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_rg UNIQUE(
            vtu_id,
            academic_year_start,
            academic_year_end, 
            course_type,
            enrolled,
            thesis_submitted,
            api_score
        )
    );
`;
// More details on The Table


// For any Altering in the future
const alterTableQuery = `
	
`;

(async function () {
    let connection;
    try {
        connection = await connect();

        /* Load your Query here */
        await connection.query(createTableQuery);

        console.log("PASS    CODE: DB_TC_22");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_22");
        console.error(error.message);
    }
})();