// Imports from server files
const connect = require("../../connect");


// The original significant_contributions_awards_recieved table schema
const createTableQuery = `
    CREATE TABLE significant_contributions_awards_recieved (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        academic_year_start DATE NOT NULL,
        academic_year_end DATE NOT NULL,
        description VARCHAR(100) NOT NULL,
        certified ENUM('Y', 'N'),

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_ars UNIQUE(
            vtu_id, 
            academic_year_start, 
            academic_year_end,
            description,
            certified
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

        console.log("PASS    CODE: DB_TC_13");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_13");
        console.error(error.message);
    }
})();