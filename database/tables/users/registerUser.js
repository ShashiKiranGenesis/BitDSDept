// Imports from server files
const connect = require("./../../connect");

const defaultResponse = require("./../../../helpers/response/defaultResponse");
const generateResponse = require("./../../../helpers/response/generateResponse");


// The query to insert a new row of user to the users
const registerUserQuery = `
    INSERT INTO USERS(vtu_id, password)
    VALUES (?, ?);
`;


async function registerUser(vtu_id, password) {
    let connection;
    const arguments = { vtu_id, password };
    let result = defaultResponse(arguments);

    try {
        connection = await connect();

        await connection.query(registerUserQuery, [vtu_id, password]);
        console.log("PASS    Code: DB_TQ_04");

        result = generateResponse(
            false,
            "User Registerd Successfully!!",
            201,
            arguments
        );

    } catch (error) {
        console.log("ERROR    Code: DB_TQ_04");

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );

    } finally {
        connection.end();

        return result;
    }
};


module.exports = registerUser;