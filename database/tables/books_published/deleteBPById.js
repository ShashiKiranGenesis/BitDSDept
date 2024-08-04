// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a book published row by ID
const deleteBPByIdQuery = `
    DELETE FROM books_published
    WHERE id = ?;
`;

async function deleteBPById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteBPByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Book published row deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Book published row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting book published row by ID");

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

module.exports = deleteBPById;