// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch an article or chapter published row by ID
const getACPByIdQuery = `
    SELECT *
    FROM articles_chapters_published
    WHERE id = ?;
`;

async function getACPById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getACPByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Article or chapter published row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Article or chapter published row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching article or chapter published row by ID");

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

module.exports = getACPById;