// Imports from server files
const connect = require("../../connect");

const defaultResponse = require("./../../../helpers/response/defaultResponse");
const generateResponse = require("./../../../helpers/response/generateResponse");

// The Query to change user Password
const changeUserPasswordQuery = `
    UPDATE users
    SET password = ?
    WHERE vtu_id = ?
`;


const changeUserPassword = async function (vtu_id, password) {
    let connection, result;
    const arguments = { vtu_id, password };

    try {
        connection = await connect();

        const [data] = await connection.query(changeUserPasswordQuery, [password, vtu_id]);
        result = generateResponse(
            false,
            "Changed Password Succesfully",
            200,
            "Classified"
        )
    } catch (error) {
        console.log("Something went wrong while changing password");
        console.log(error.message);

        result = generateResponse(
            true,
            error.message,
            error.errno,
            "Classified"
        )
    } finally {
        return result;
    }
};


module.exports = changeUserPassword;