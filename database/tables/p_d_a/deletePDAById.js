// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a PDA row by ID
const deletePDAByIdQuery = `
    DELETE 
    FROM profesional_development_activity
    WHERE id = ?;
`;

async function deletePDAById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deletePDAByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "PDA row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "PDA row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting PDA row from the pda table");

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

module.exports = deletePDAById;