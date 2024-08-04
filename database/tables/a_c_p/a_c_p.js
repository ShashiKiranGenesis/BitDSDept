// Imports from server files
const connect = require("../../connect");


// The original articles_chapters_published table schema
const createTableQuery = `
    CREATE TABLE articles_chapters_published (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vtu_id VARCHAR(15) NOT NULL,
        date_of_event DATE NOT NULL,
        title_with_page VARCHAR(100) NOT NULL,
        book_editor_publisher_desc VARCHAR(100),
        ISSN_ISBN VARCHAR(20) NOT NULL,
        peer_review_desc VARCHAR(100),
        no_of_co_authors TINYINT,
        main_author VARCHAR(50),
        api_score TINYINT NOT NULL,

        FOREIGN KEY (vtu_id) REFERENCES employees(vtu_id),

        CONSTRAINT unique_row_acp UNIQUE(
            vtu_id, 
            date_of_event,
            title_with_page,
            ISSN_ISBN,
            no_of_co_authors,
            main_author,
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

        console.log("PASS    CODE: DB_TC_18");
    } catch (error) {
        console.error("ERROR    CODE: DB_TC_18");
        console.error(error.message);
    }
})();