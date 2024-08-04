// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an ITRE row by ID
const deleteITREByIdQuery = `
    DELETE FROM innovative_teaching_resource_enhancement
    WHERE id = ?;
`;

async function deleteITREById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteITREByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ITRE row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "ITRE row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting ITRE row from the itre table");

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

module.exports = deleteITREById;
