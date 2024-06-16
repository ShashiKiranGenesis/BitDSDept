// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a paper presented row by ID
const deletePPCSWByIdQuery = `
    DELETE 
    FROM papers_presented_conference_seminar_workshop
    WHERE id = ?;
`;

async function deletePPCSWById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deletePPCSWByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Paper presented row deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Paper presented row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting paper presented row by ID");

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

module.exports = deletePPCSWById;