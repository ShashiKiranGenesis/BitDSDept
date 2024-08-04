// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an article or chapter published row by ID
const deleteACPByIdQuery = `
    DELETE FROM articles_chapters_published
    WHERE id = ?;
`;

async function deleteACPById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteACPByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Article or chapter published row deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Article or chapter published row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting article or chapter oublished row by ID");

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

module.exports = deleteACPById;