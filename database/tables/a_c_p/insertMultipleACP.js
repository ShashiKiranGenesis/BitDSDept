// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert multiple articles or chapters published rows
const insertMultipleACPQuery = `
    INSERT INTO 
    articles_chapters_published (
        vtu_id,
        date_of_event,
        title_with_page,
        book_editor_publisher_desc,
        ISSN_ISBN,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    ) 
    VALUES 
`;

async function insertMultipleACP(rows) {
    let connection;
    let result;

    try {
        const values = rows.map(
            row => `('${row.vtu_id}', '${row.date_of_event}', '${row.title_with_page}', '${row.book_editor_publisher_desc}', '${row.ISSN_ISBN}', '${row.peer_review_desc}', '${row.no_of_co_authors}', '${row.main_author}', '${row.api_score}')`
        ).join(',');

        connection = await connect();

        const query = insertMultipleACPQuery + values;

        const [data] = await connection.query(query);
        
        if (data.affectedRows === rows.length) {
            result = generateResponse(
                false,
                "Multiple articles or chapters published rows inserted successfully",
                201,
                rows
            );
        } else {
            result = generateResponse(
                true,
                "Could not insert all multiple articles or chapters published rows",
                401,
                rows
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong inserting multiple articles or chapters published rows");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { rows }
        );

    } finally {
        return result;
    }
}

module.exports = insertMultipleACP;