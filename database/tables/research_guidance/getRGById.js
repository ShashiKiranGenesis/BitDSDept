// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a research guidance row by ID
const getRGByIdQuery = `
    SELECT *
    FROM research_guidance
    WHERE id = ?;
`;

async function getRGById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getRGByIdQuery, [id]);

        if (data.length === 1)
            result = generateResponse(
                false,
                "Research guidance row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Research guidance row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching the research guidance row by ID");

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

module.exports = getRGById;