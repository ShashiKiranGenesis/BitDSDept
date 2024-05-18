// Imports from server files
const connect = require("../../connect");


// The original proffesional_development_activity table schema
const createTableQuery = `
    CREATE TABLE profesional_development_activity (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        date_of_event DATE NOT NULL,
        description VARCHAR(100) NOT NULL,
        organizing_community VARCHAR(50) NOT NULL,
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_pda UNIQUE(
            vtu_id, 
            date_of_event,
            description,
            organizing_community,
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

        console.log("PASS    CODE: DB_TC_16");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_16");
        console.error(error.message);
    } finally {
        connection.end();
    }
})();