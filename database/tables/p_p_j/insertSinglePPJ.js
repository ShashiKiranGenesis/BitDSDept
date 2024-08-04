// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single published paper row
const insertSinglePPJQuery = `
    INSERT INTO 
    published_paper_in_journal (
        vtu_id,
        date_of_event,
        title_with_page,
        journal,
        ISSN_ISBN,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

async function insertSinglePPJ(data) {
    let connection;
    let result;

    const {
        vtu_id,
        date_of_event,
        title_with_page,
        journal,
        ISSN_ISBN,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    } = data;
    const arguments = {
        vtu_id,
        date_of_event,
        title_with_page,
        journal,
        ISSN_ISBN,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    };

    try {
        connection = await connect();
        const [data] = await connection.query(
            insertSinglePPJQuery,
            [vtu_id, date_of_event, title_with_page, journal, ISSN_ISBN, peer_review_desc, no_of_co_authors, main_author, api_score]
        );

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Published paper row inserted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert published paper row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting published paper row");

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

module.exports = insertSinglePPJ;