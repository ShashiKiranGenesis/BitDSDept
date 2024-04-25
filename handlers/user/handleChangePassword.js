// Imports from Server Files
const CustomError = require("../../helpers/response/customError");

const changeUserPassword = require("../../database/tables/users/changeUserPassword");
const getUserByVtuID = require("../../database/tables/users/getUserById");

const { isSamePassword, hashPassword } = require("../../helpers/authentication/password");
const generateResponse = require("../../helpers/response/generateResponse");


const handleChangePassword = async function (vtu_id, oldPassword, newPassword) {
    let result;
    const arguments = { vtu_id, oldPassword, newPassword };

    try {
        result = await getUserByVtuID(vtu_id);
        // 'currentPassword' is the password currently stored in DataBase
        const { password: currentPassword } = result.payload;
        const isAuthentic = await isSamePassword(oldPassword, currentPassword);

        if (!isAuthentic) {
            throw new CustomError(
                "Entered Password doesn't match with current Password",
                401,
                arguments
            );
        }

        newPassword = await hashPassword(newPassword);
        result = await changeUserPassword(vtu_id, newPassword);

    } catch (error) {
        console.log("Something went wrong while changing password");
        console.log(error.message);

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );
    } finally {
        return result;
    }
};


module.exports = handleChangePassword;