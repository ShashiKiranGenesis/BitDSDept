// Imports from server files
const connect = require("../../connect");


// The original ongoing_completed_research_project_consultancy table schema
const createTableQuery = `
    CREATE TABLE ongoing_completed_research_project_consultancy (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        date_of_event DATE NOT NULL,
        duration SMALLINT NOT NULL,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(100),
        agency VARCHAR(50) NOT NULL,
        status ENUM('ongoing', 'completed'),
        grant_recieved INT NOT NULL,
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_ocrpc UNIQUE(
            vtu_id, 
            date_of_event,
            duration,
            title,
            agency,
            status,
            api_score
        )
    );
`;
// More details on The Table
/*
duration- Time in months
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

        console.log("PASS    CODE: DB_TC_21");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_21");
        console.error(error.message);
    }
})();