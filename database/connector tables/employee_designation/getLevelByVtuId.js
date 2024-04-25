// Imports from Server Files
const connect = require("./../../connect");

const generateResponse = require("../../../helpers/response/generateResponse");


//The Query to get Max Level of an Employee by his/her 'vtu_id'
const getLevelByVtuIdQuery = `
    SELECT MAX(d.level) AS max_level
    FROM employees e
        JOIN employee_designation ed ON e.vtu_id = ed.vtu_id
        JOIN designations d ON ed.title = d.title
    WHERE e.vtu_id = ?
    GROUP BY e.vtu_id;
`;


async function getLevelByVtuId(vtu_id) {

    const arguments = { vtu_id };
    let connection;
    let result;

    try {
        connection = await connect();
        const [data] = await connection.query(getLevelByVtuIdQuery, [vtu_id]);

        // If No User exists having said 'vtu_id' 
        if (data.length === 0) {
            result = generateResponse(
                true,
                "User doesn't exist or doesn't have a role in BIT",
                401,
                arguments
            );
        }
        // If User with said 'vtu_id' is Found 
        else {
            result = generateResponse(
                false,
                "User found with given vtu_id",
                200,
                {
                    ...arguments,
                    max_level: data[0].max_level
                }
            );
        }

    } catch (error) {
        console.log("ERROR    Something went Wrong while Finding Level of User");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            { ...arguments }
        );

    } finally {
        connection.end();

        return result;
    }
}

module.exports = getLevelByVtuId;