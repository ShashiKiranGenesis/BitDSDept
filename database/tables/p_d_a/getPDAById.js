// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single PDA row by ID
const getSinglePDARowByIdQuery = `
    SELECT *
    FROM profesional_development_activity
    WHERE id = ?;
`;

async function getPDAById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSinglePDARowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "PDA row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "PDA row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching PDA row by ID");

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

module.exports = getPDAById;
