// Imports from Server Files

const registerEmployee = require("../../database/tables/employees/registerEmployee");
const generateResponse = require("../../helpers/response/generateResponse");



const handleRegisterEmployee = async function (req, res) {

    // The fields required for the registration of an employee for the first time
    const {
        vtu_id = "not-entered",
        full_name = "not-entered",
        father_name = "not-entered",
        mother_name = "not-entered",
        mobile = "not-entered",
        emergency_mobile = "not-entered",
        pad = "not-entered",
        email_address = "not-entered",
        pan_number = "not-entered",
    } = req.body;

    const arguments = {
        vtu_id,
        full_name,
        father_name,
        mother_name,
        mobile,
        emergency_mobile,
        pad,
        email_address,
        pan_number
    };

    let result;

    if (!validArguments(...Object.values(arguments))) {
        result = invalidArgumentsResponse(req, res, arguments);
    } else {
        try {
            result = await registerEmployee(arguments);
        } catch (error) {
            console.log("Something went wrong while registering Employee");
            console.log(error.message);

            result = generateResponse(
                true,
                error.message,
                500,
                arguments
            );
        }
    }

    return result;
}

module.exports = handleRegisterEmployee;