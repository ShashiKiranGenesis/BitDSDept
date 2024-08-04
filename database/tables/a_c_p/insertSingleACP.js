// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single book published row
const insertSingleAPCQuery = `
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleAPC(data) {
    let connection;
    let result;

    const { vtu_id, date_of_event, title_with_page, book_editor_publisher_desc, ISSN_ISBN, peer_review_desc, no_of_co_authors, main_author, api_score } = data;
    const arguments = { vtu_id, date_of_event, title_with_page, book_editor_publisher_desc, ISSN_ISBN, peer_review_desc, no_of_co_authors, main_author, api_score };

    try {
        connection = await connect();
        const [data] = await connection.query(
            insertSingleAPCQuery,
            [vtu_id, date_of_event, title_with_page, book_editor_publisher_desc, ISSN_ISBN, peer_review_desc, no_of_co_authors, main_author, api_score]
        );

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Articles or chapters published row inserted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert Articles or chapters published row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting Articles or chapters published row");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = insertSingleAPC;