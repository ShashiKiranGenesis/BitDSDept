// Imports from server files
const connect = require("../../connect");


// The original papers_presented_conference_seminar_workshop table schema
const createTableQuery = `
    CREATE TABLE papers_presented_conference_seminar_workshop (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        date_of_event DATE,
        title_of_paper VARCHAR(50) NOT NULL,
        title_of_event VARCHAR(50) NOT NULL,
        event_level ENUM('I', 'N', 'S', 'C', 'R') NOT NULL,
        organized_by VARCHAR(50) NOT NULL,
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_ppcsw UNIQUE(
            vtu_id,
            date_of_event,
            title_of_paper,
            title_of_event,
            organized_by, 
            api_score
        )
    );
`;
// More details on The Table
/*
duration is in days
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

        console.log("PASS    CODE: DB_TC_24");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_24");
        console.error(error.message);
    }
})();