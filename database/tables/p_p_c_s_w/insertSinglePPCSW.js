// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single paper presented row
const insertSinglePPCSWQuery = `
    INSERT INTO 
    papers_presented_conference_seminar_workshop (
        vtu_id,
        date_of_event,
        title_of_paper,
        title_of_event,
        event_level,
        organized_by,
        api_score
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
`;

async function insertSinglePPCSW(data) {
    let connection;
    let result;

    const { vtu_id, date_of_event, title_of_paper, title_of_event, event_level, organized_by, api_score } = data;
    const arguments = { vtu_id, date_of_event, title_of_paper, title_of_event, event_level, organized_by, api_score };

    try {
        connection = await connect();
        const [data] = await connection.query(
            insertSinglePPCSWQuery,
            [vtu_id, date_of_event, title_of_paper, title_of_event, event_level, organized_by, api_score]
        );

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Paper presented row inserted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert paper presented row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting paper presented row");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );

    } finally {
        return result;
    }
}

module.exports = insertSinglePPCSW;