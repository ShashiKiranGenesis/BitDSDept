// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single programme invited as guest speaker row
const insertSinglePIGSQuery = `
    INSERT INTO 
    programmes_invited_as_guest_speaker (
        vtu_id,
        date_of_event,
        title_of_lecture,
        title_of_conference,
        event_level,
        organized_by,
        api_score
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
`;

async function insertSinglePIGS(data) {
    let connection;
    let result;

    const { vtu_id, date_of_event, title_of_lecture, title_of_conference, event_level, organized_by, api_score } = data;
    const arguments = { vtu_id, date_of_event, title_of_lecture, title_of_conference, event_level, organized_by, api_score };

    try {
        connection = await connect();
        const [data] = await connection.query(
            insertSinglePIGSQuery,
            [vtu_id, date_of_event, title_of_lecture, title_of_conference, event_level, organized_by, api_score]
        );

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Programme invited as guest speaker row inserted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert programme invited as guest speaker row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting programme invited as guest speaker row");

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

module.exports = insertSinglePIGS;