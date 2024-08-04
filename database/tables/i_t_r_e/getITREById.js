// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a single ITRE row by ID
const getSingleITRERowByIdQuery = `
    SELECT *
    FROM innovative_teaching_resource_enhancement
    WHERE id = ?;
`;

async function getITREById(data) {
    let connection;
    let result;
    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getSingleITRERowByIdQuery, [id]);

        if (data.length === 1) {
            result = generateResponse(
                false,
                "ITRE row Fetched Successfully",
                200,
                data[0]
            );
        } else {
            result = generateResponse(
                true,
                "ITRE row not found",
                404,
                arguments
            );
        }

    } catch (error) {
        console.log("ERROR: Something went wrong fetching ITRE row by ID");

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

module.exports = getITREById;
