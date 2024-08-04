// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to fetch a book published row by ID
const getBooksPublishedByIdQuery = `
    SELECT *
    FROM books_published
    WHERE id = ?;
`;

async function getBooksPublishedById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(getBooksPublishedByIdQuery, [id]);

        if (data.length > 0)
            result = generateResponse(
                false,
                "Book published row fetched successfully",
                200,
                data[0]
            );
        else
            result = generateResponse(
                true,
                "Book published row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong fetching book published row by ID");

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

module.exports = getBooksPublishedById;