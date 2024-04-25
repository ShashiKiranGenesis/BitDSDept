// Imports from Server Files

const getEmpDetailsByVtuId = require("../../database/tables/employees/getEmpDetailsByVtuId");
const updateEmployeeDetailsByVtu_Id = require("../../database/tables/employees/updateEmployeeDetailsByVtuId");

const stitchUpdateQuery = require("../../helpers/qeury stitchers/stitchUpdateQuery");

const generateResponse = require("../../helpers/response/generateResponse");


const handleEditEmployee = async function (req, res) {
    const { vtu_id = "not-entered" } = req.params;

    // The Schema of the employees Table that can be changed without conflict
    const {
        full_name = "not-entered",
        father_name = "not-entered",
        mother_name = "not-entered",
        mobile = "not-entered",
        emergency_mobile = "not-entered",
        pad = "not-entered",
        email_address = "not-entered",
    } = req.body;

    // Note the id abd vtu_id is not taken from req body, to avoid any changes to the id in the db
    const arguments = {
        id: "not-entered",
        vtu_id: "not-entered",
        full_name,
        father_name,
        mother_name,
        mobile,
        emergency_mobile,
        pad,
        email_address,
        pan_number: "not-entered"
    };

    let result;

    try {
        result = await getEmpDetailsByVtuId(vtu_id);
        if (!result.error) {
            const oldFields = result.payload.details;
            const newFields = arguments;

            result = stitchUpdateQuery(oldFields, newFields);

            if (!result.error) {
                result = await updateEmployeeDetailsByVtu_Id(vtu_id, result.payload);
            }
        }
    } catch (error) {
        console.log("Something went wrong while editing Employee");
        console.log(error.message);

        result = generateResponse(
            true,
            error.message,
            error.errno,
            arguments
        );
    }

    return result;
};

module.exports = handleEditEmployee;