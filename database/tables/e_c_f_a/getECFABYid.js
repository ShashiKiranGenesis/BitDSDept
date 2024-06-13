// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single ECF row by ID
const getSingleECFRowByIdQuery = `
    SELECT *
    FROM extentions_cocurricular_field_activity
    WHERE id = ?;
`;

async function getECFById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSingleECFRowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "ECF row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "ECF row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching ECF row by ID");

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

module.exports = getECFById;