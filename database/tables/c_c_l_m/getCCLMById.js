// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single CCM row by ID
const getSingleCCMRowByIdQuery = `
    SELECT *
    FROM contribution_to_corporate_management
    WHERE id = ?;
`;

async function getCCMById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSingleCCMRowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "CCM row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "CCM row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching CCM row by ID");

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

module.exports = getCCMById;
