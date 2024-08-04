// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an ECF row by ID
const deleteECFByIdQuery = `
    DELETE 
    FROM extentions_cocurricular_field_activity
    WHERE id = ?;
`;

async function deleteECFById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteECFByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ECF row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "ECF row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting ECF row from the ecf table");

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

module.exports = deleteECFById;