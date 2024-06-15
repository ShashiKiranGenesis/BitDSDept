// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a research guidance row by ID
const deleteRGByIdQuery = `
    DELETE 
    FROM research_guidance
    WHERE id = ?;
`;

async function deleteRGById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteRGByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Research guidance row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Research guidance row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting research guidance row from the research_guidance table");

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

module.exports = deleteRGById;