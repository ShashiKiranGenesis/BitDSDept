// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an OCRPC row by ID
const deleteOCRPCByIdQuery = `
    DELETE 
    FROM ongoing_completed_research_project_consultancy
    WHERE id = ?;
`;

async function deleteOCRPCById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteOCRPCByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "OCRPC row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "OCRPC row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting OCRPC row from the OCRPC table");

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

module.exports = deleteOCRPCById;