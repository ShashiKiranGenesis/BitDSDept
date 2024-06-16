// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single development programme attended row
const insertSingleDPAQuery = `
    INSERT INTO 
    development_programme_attended (
        vtu_id,
        date_of_event,
        description,
        duration,
        organized_by,
        api_score
    ) 
    VALUES (?, ?, ?, ?, ?, ?);
`;

async function insertSingleDPA(data) {
    let connection;
    let result;

    const { vtu_id, date_of_event, description, duration, organized_by, api_score } = data;
    const arguments = { vtu_id, date_of_event, description, duration, organized_by, api_score };

    try {
        connection = await connect();
        const [data] = await connection.query(
            insertSingleDPAQuery,
            [vtu_id, date_of_event, description, duration, organized_by, api_score]
        );

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Development programme attended row inserted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert Development programme attended row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting development programme attended row");

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

module.exports = insertSingleDPA;