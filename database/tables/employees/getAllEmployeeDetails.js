// Imports from server files
const connect = require("./../../connect");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to get the details of all employees
const getAllEmployeeDetailsQuery = `
    SELECT 
        vtu_id,
        full_name,
        father_name,
        mother_name,
        mobile,
        emergency_mobile, 
        pad, 
        email_address
    FROM employees
    ORDER BY full_name;
`;


const getAllEmployeeDetails = async function (arguments) {
    let connection, result;

    try {
        connection = await connect();
        const [data] = await connection.query(getAllEmployeeDetailsQuery);
        result = generateResponse(
            false,
            "All Employees Details sent!",
            200,
            { details: data }
        );

    } catch (error) {
        console.log("ERROR    Something went wrong while getting all employee details");
        console.log(error.message);

        result = generateResponse(
            true,
            error.message,
            error.errno,
            {
                arguments
            }
        );
    } finally {
        return result;
    }
}


module.exports = getAllEmployeeDetails;