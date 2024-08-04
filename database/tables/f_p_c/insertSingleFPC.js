// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single full paper in conference
const insertSingleFPCQuery = `
    INSERT INTO 
    full_papers_in_conference (
        vtu_id,
        date_of_event,
        title_with_page,
        description,
        peer_review_desc,
        no_of_co_authors,
        main_author,
        api_score
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleFPC(data) {
    let connection;
    let result;

    const { vtu_id, date_of_event, title_with_page, description, peer_review_desc, no_of_co_authors, main_author, api_score } = data;
    const arguments = { vtu_id, date_of_event, title_with_page, description, peer_review_desc, no_of_co_authors, main_author, api_score };

    try {
        connection = await connect();
        const [data] = await connection.query(
            insertSingleFPCQuery,
            [vtu_id, date_of_event, title_with_page, description, peer_review_desc, no_of_co_authors, main_author, api_score]
        );

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Full paper in conference inserted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert full paper in conference",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting full paper in conference");

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

module.exports = insertSingleFPC;