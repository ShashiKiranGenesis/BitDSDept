// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single OCRPC row
const insertSingleOCRPCRowQuery = `
    INSERT INTO 
    ongoing_completed_research_project_consultancy (vtu_id, date_of_event, duration, title, description, agency, status, grant_recieved, api_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

async function insertSingleOCRPC(data) {
    let connection;
    let result;

    const {
        vtu_id,
        date_of_event,
        duration,
        title,
        description,
        agency,
        status,
        grant_recieved,
        api_score
    } = data;
    const arguments = {
        vtu_id,
        date_of_event,
        duration,
        title,
        description,
        agency,
        status,
        grant_recieved,
        api_score
    };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSingleOCRPCRowQuery, [
            vtu_id,
            date_of_event,
            duration,
            title,
            description,
            agency,
            status,
            grant_recieved,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "OCRPC row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert OCRPC row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting OCRPC row");

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

module.exports = insertSingleOCRPC;