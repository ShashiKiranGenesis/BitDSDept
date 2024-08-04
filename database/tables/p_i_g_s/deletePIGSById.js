// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete a programmes invited as guest speaker row by ID
const deletePIGSByIdQuery = `
    DELETE 
    FROM programmes_invited_as_guest_speaker
    WHERE id = ?;
`;

async function deletePIGSById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deletePIGSByIdQuery, [id]);

        if (data.affectedRows > 0)
            result = generateResponse(
                false,
                "Programmes invited as guest speaker row deleted successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Programmes invited as guest speaker row not found",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting programmes invited as guest speaker row by ID");

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

module.exports = deletePIGSById;