// Imports from Server Files
const connect = require("./../../connect");
const generateResponse = require("../../../helpers/response/generateResponse");


//The Query to get all rows of the employee_designations Table
const getAllDesignationsQuery = `
    SELECT *
    FROM employee_designation
    ORDER BY vtu_id;
`;


async function getAllDesignations() {
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getAllDesignationsQuery);
        
        if (data.length === 0)
            result = generateResponse(
                true,
                "No Employees with Designations Found",
                200,
                data
            );
        else
            result = generateResponse(
                false,
                "All Employees with Designations details Sent",
                200,
                data
            );
    } catch (error) {
        console.log("ERROR    Something went Wrong while Fetching all designations");

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

module.exports = getAllDesignations;