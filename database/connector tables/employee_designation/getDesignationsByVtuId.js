// Imports from Server Files
const connect = require("../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");


//The Query to get Designations of a particular employee
const getDesignationByVtuIdQuery = `
    SELECT *
    FROM employee_designation
    WHERE vtu_id = ?;
`;


async function getDesignationByVtuId(vtu_id) {
    let arguments = { vtu_id };
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getDesignationByVtuIdQuery, [vtu_id]);

        if (data.length === 0)
            result = generateResponse(
                true,
                "Employee with entered vtu_id has not been assigned any post",
                200,
                arguments
            );
        else
            result = generateResponse(
                false,
                "All Designations of Employee sent",
                200,
                data
            );
    } catch (error) {
        console.log("ERROR    Something went Wrong while fetching designations of given vtu_id");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            {}
        );

    } finally {
        return result;
    }
}

module.exports = getDesignationByVtuId;