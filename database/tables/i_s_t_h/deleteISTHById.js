// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an ISTH row by ID
const deleteISTHByIdQuery = `
    DELETE FROM instructor_semester_teaching_hours
    WHERE id = ?;
`;

async function deleteISTHById(id) {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(deleteISTHByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "ISTH row Deleted Successfully",
                200,
                { id }
            );
        else
            result = generateResponse(
                true,
                "ISTH row not found or could not be deleted",
                404,
                { id }
            );

    } catch (error) {
        console.log("ERROR: Something went Wrong Deleting ISTH row from the isth table");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { id }
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = deleteISTHById;