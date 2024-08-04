// Imports from server files
const connect = require("../../connect");

const defaultResponse = require("./../../../helpers/response/defaultResponse");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to get one user with VtuID
const getUserByVtuIDQuery = `
    SELECT vtu_id, password 
    FROM users
    WHERE vtu_id = ?
    LIMIT 1
`;


async function getUserByVtuID(vtu_id) {
    let connection;
    const arguments = { vtu_id };
    let result = defaultResponse(arguments);

    try {
        connection = await connect();

        let [data] = await connection.query(getUserByVtuIDQuery, [vtu_id]);
        
        //a row exists with matching vtu id in users table
        if (data.length !== 0) {
            const { password } = data[0];
            
            result = generateResponse(
                false,
                "User found with given credentials",
                200,
                { vtu_id, password }
            );
        } else {
            result = generateResponse(
                true,
                "Invalid Credentials",
                400,
                { vtu_id }
            );
        }

    } catch (error) {
        result = generateResponse(
            true,
            error.message,
            error.errno,
            vtu_id
        );
    } finally {
        return result;
    }
};

module.exports = getUserByVtuID;