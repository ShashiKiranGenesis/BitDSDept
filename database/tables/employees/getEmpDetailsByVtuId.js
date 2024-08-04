// Imports from server files
const connect = require("./../../connect");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The query to fetch the details of a particular employee
const getEmpDetailsByVtuIdQuery = `
    SELECT *
    FROM employees
    WHERE vtu_id = ?
`;


async function getEmpDetailsByVtuId(vtu_id) {
    let result;
    let connection;
    const payload = [vtu_id];

    try {
        connection = await connect();

        const [data] = await connection.query(getEmpDetailsByVtuIdQuery, payload);

        if (data.length === 0) {
            result = generateResponse(
                true,
                "Employee not found!!",
                400,
                { vtu_id }
            );
        } else {
            result = generateResponse(
                false,
                "Employee found, details sent!!",
                200,
                { details: data[0] }
            );
        }


    } catch (error) {
        console.log("ERROR    Something went wrong when fetching Employee(1) Details");
        result = generateResponse(true, error.message, error.errno, payload);
    } finally {
        return result;
    }
}


module.exports = getEmpDetailsByVtuId;