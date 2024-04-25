// Import from Server Files
const getEmpDetailsByVtuId = require("../../database/tables/employees/getEmpDetailsByVtuId");
const { isSamePassword } = require("../../helpers/authentication/password");
const CustomError = require("../../helpers/response/customError");
const generateResponse = require("../../helpers/response/generateResponse");
const handleChangePasswordByAdmin = require("./handleChangePasswordByAdmin");


const handleForgetPassword = async function (vtu_id, pan_number, password) {
    const arguments = { vtu_id, pan_number, pan_number };
    let result;

    try {
        result = await getEmpDetailsByVtuId(vtu_id);

        if (!result.error) {
            // 'currentPan' refers to the Hashed-Pan-Number Stored in DataBase
            const currentPan = result?.payload?.details?.pan_number;
            const authentic = await isSamePassword(pan_number, currentPan);

            if (!authentic) {
                throw new CustomError(
                    "Invalid vtu_id or PAN-NUMBER",
                    401,
                    arguments
                );
            }

            result = await handleChangePasswordByAdmin(vtu_id, password);
        }
    } catch (error) {
        console.log("ERROR    Something went Wrong in 'handleForgetPassword'");
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
}


module.exports = handleForgetPassword;