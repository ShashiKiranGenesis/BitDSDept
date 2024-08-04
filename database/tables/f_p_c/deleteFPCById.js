// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a full paper in conference by ID
const deleteFPCByIdQuery = `
    DELETE FROM full_papers_in_conference
    WHERE id = ?;
`;

async function deleteFPCById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteFPCByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Full paper in conference deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Full paper in conference not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting full paper in conference by ID");

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

module.exports = deleteFPCById;