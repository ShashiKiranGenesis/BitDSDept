// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple books published rows
const insertMultipleBooksPublishedQuery = `
    INSERT INTO 
    books_published (
        vtu_id,
        date_of_event,
        title_with_page,
        description,
        ISSN_ISBN,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    ) 
    VALUES 
`;

async function insertMultipleBooksPublished(rows) {
    let connection;
    let result;

    try {
        const values = rows.map(
            row => `('${row.vtu_id}', '${row.date_of_event}', '${row.title_with_page}', '${row.description}', '${row.ISSN_ISBN}', '${row.peer_review_desc}', '${row.no_of_co_authors}', '${row.main_author}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultipleBooksPublishedQuery + values;

        const [data] = await connection.query(query);
        
        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple books published rows inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all multiple books published rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple books published rows");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { rows }
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = insertMultipleBooksPublished;