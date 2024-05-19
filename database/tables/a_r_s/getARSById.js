// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single ARS row by ID
const getSingleARSRowByIdQuery = `
    SELECT *
    FROM additional_resources_to_students
    WHERE id = ?;
`;

async function getARSById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSingleARSRowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "ARS row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "ARS row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching ARS row by ID");

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

module.exports = getARSById;