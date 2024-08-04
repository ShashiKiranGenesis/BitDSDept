// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a published paper row by ID
const deletePPJByIdQuery = `
    DELETE FROM published_paper_in_journal
    WHERE id = ?;
`;

async function deletePPJById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deletePPJByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Published paper row deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Published paper row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting published paper row by ID");

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

module.exports = deletePPJById;