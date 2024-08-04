// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single OCRPC row by ID
const getSingleOCRPCRowByIdQuery = `
    SELECT *
    FROM ongoing_completed_research_project_consultancy
    WHERE id = ?;
`;

async function getOCRPCById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSingleOCRPCRowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "OCRPC row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "OCRPC row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching OCRPC row by ID");

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

module.exports = getOCRPCById;