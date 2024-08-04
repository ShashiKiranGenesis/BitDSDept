// Imports from server files
const connect = require("../../connect");


// The original contribution_to_corporate_management table schema
const createTableQuery = `
    CREATE TABLE contribution_to_corporate_management (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        academic_year_start DATE NOT NULL,
        academic_year_end DATE NOT NULL,
        description VARCHAR(100) NOT NULL,
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_cclm UNIQUE(
            vtu_id, 
            academic_year_start, 
            academic_year_end,
            description,
            api_score
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

        console.log("PASS    CODE: DB_TC_15");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_15");
        console.error(error.message);
    }
})();