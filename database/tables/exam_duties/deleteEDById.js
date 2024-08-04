// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");

// The Query to delete an examination duty row by ID
const deleteExaminationDutyByIdQuery = `
    DELETE FROM examination_duties
    WHERE id = ?;
`;

async function deleteExaminationDutyById(data) {
    let connection;
    let result;

    const { id } = data;
    const arguments = { id };

    try {
        connection = await connect();
        const [data] = await connection.query(deleteExaminationDutyByIdQuery, [id]);

        if (data.affectedRows === 1)
            result = generateResponse(
                false,
                "Examination duty row Deleted Successfully",
                200,
                arguments
            );
        else
            result = generateResponse(
                true,
                "Examination duty row not found or could not be deleted",
                404,
                arguments
            );

    } catch (error) {
        console.log("ERROR: Something went wrong deleting examination duty row from the table");

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

module.exports = deleteExaminationDutyById;
