// Imports from Server Files
const connect = require("./../../connect");

const generateResponse = require("./../../../helpers/response/generateResponse");

// This Function will Update Employee Details
// Stored in the DataBase Efficiently
async function updateEmployeeDetailsByVtu_Id(vtu_id, request) {
    let connection;

    const { finalStitch, finalStitchOrder } = request;
    const arguments = { finalStitch, finalStitchOrder };
    let result;

    const updateEmployeeDetailsByVtu_IdQuery = `
        UPDATE employees
        ${arguments.finalStitch}
        WHERE vtu_id = ?
    `;

    // If the new Data is Similar to old Data
    // finalStichOrder will contain nothing
    if (finalStitchOrder.length == 0) {
        result = generateResponse(
            true,
            "There is probably nothing to update",
            400,
            { finalStitchOrder }
        );
    } else {
        try {
            connection = await connect();
            const [data] = await connection.query(updateEmployeeDetailsByVtu_IdQuery, [...finalStitchOrder, vtu_id]);

            if (data.affectedRows >= 1) {
                result = generateResponse(
                    false,
                    "Employee Update Succesfully!",
                    200,
                    { finalStitchOrder }
                )
            }
        } catch (error) {
            console.log("ERROR    Something went wrong while updating employee details!");
            console.log(error.message);

            result = generateResponse(
                true,
                error.message,
                error.errno,
                arguments
            )
        }
    }

    return result;
}


module.exports = updateEmployeeDetailsByVtu_Id;