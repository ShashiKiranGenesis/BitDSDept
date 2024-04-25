const changeUserPassword = require("../../database/tables/users/changeUserPassword");
const { hashPassword } = require("../../helpers/authentication/password");
const generateResponse = require("../../helpers/response/generateResponse");

const handleChangePasswordByAdmin = async function (vtu_id, password) {
    let result;
    const arguments = { vtu_id, password };

    try {
        password = await hashPassword(password);
        result = await changeUserPassword(vtu_id, password);
    } catch (error) {
        console.log("Something went wrong while overriding password");
        console.log(error.message);

        result = generateResponse(
            true,
            error.message,
            500,
            arguments
        );
    }

    return result;
}


module.exports = handleChangePasswordByAdmin;