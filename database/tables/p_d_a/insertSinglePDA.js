// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to insert a single PDA row
const insertSinglePDARowQuery = `
    INSERT INTO 
    profesional_development_activity (vtu_id, date_of_event, description, organizing_community, api_score)
    VALUES (?, ?, ?, ?, ?);
`;

async function insertSinglePDA(data) {
    let connection;
    let result;

    const { vtu_id, date_of_event, description, organizing_community, api_score } = data;
    const arguments = { vtu_id, date_of_event, description, organizing_community, api_score };

    try {
        connection = await connect();
        const [data] = await connection.query(insertSinglePDARowQuery, [
            vtu_id,
            date_of_event,
            description,
            organizing_community,
            api_score
        ]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "PDA row Inserted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Failed to insert PDA row",
                500,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong inserting PDA row");

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

module.exports = insertSinglePDA;
