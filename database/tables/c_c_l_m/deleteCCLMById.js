// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a CCM row by ID
const deleteCCMByIdQuery = `
    DELETE FROM contribution_to_corporate_management
    WHERE id = ?;
`;

async function deleteCCMById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteCCMByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "CCM row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "CCM row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting CCM row from the ccm table");

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

module.exports = deleteCCMById;