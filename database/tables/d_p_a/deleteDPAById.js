// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a development programme attended row by ID
const deleteDPAByIdQuery = `
    DELETE FROM development_programme_attended
    WHERE id = ?;
`;

async function deleteDPAById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteDPAByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Development programme attended row deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Development programme attended row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting development programme attended row by ID");

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

module.exports = deleteDPAById;