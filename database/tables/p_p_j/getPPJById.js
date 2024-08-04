// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a published paper row by ID
const getPPJByIdQuery = `
    SELECT *
    FROM published_paper_in_journal
    WHERE id = ?;
`;

async function getPPJById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getPPJByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Published paper row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Published paper row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching published paper row by ID");

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

module.exports = getPPJById;