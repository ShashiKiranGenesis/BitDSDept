// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an ARS row by ID
const deleteARSByIdQuery = `
    DELETE FROM additional_resources_to_students
    WHERE id = ?;
`;

async function deleteARSById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteARSByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ARS row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "ARS row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting ARS row from the ars table");

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

module.exports = deleteARSById;